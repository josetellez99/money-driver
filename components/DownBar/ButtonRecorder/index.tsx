'use client'

import React from "react"

import OpenAI from "openai";
import createTransactionVoicefull from '@/app/lib/test'
import { fetchUserAccounts, fetchUserBudgetWithSubcategories } from '@/app/lib/action'
import Summarytransaction from "@/components/SummaryTransaction";
import SubmitButton from "@/components/FormRegister/SubmitButton";
import { FaMicrophone } from "react-icons/fa";
import PopUpLayer from "@/components/PopupLayer";


let mediaRecorder: MediaRecorder | null;
let audioChunks : any = [];

const ButtonRecorder = () => {

    const [isRecording, setIsRecording] = React.useState(false)
    const[openModal, setOpenModal] = React.useState(false)
    const[activeButtons, setActiveButtons] = React.useState<boolean>(false)

    const[userAccounts, setUserAccounts] = React.useState<UserAccount[]>([])
    const[userIncomeBudget, setUserIncomeBudget] = React.useState<BudgetItem[]>([])
    const[userExpenseBudget, setUserExpenseBudget] = React.useState<BudgetItem[]>([])

    const[newTransaction, setNewTransaction] = React.useState<Transaction>({
        type: '',
        date: new Date().toISOString(),
        accountFrom: '',
        accountFromId: '',
        subcategoryFrom: '',
        subcategoryFromId: '',
        accountTo: '',
        accountToId: '',
        subcategoryTo: '',
        subcategoryToId: '',
        amount: 0,
        description: ''
    })


    React.useEffect(() => {
        fetchUserAccounts()
            .then(data => {
                setUserAccounts(data)
                return fetchUserBudgetWithSubcategories('income');
            })
            .then(data => {
                setUserIncomeBudget(data)
                return fetchUserBudgetWithSubcategories('expense');
            })
            .then(data => {
                setUserExpenseBudget(data)
            })
            .catch(error => console.error(error));
    }, [])


    const handleRecordStart = async () => {

        setOpenModal(true)
        
        navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunks.push(event.data);
                }
            };

            mediaRecorder.onstop = async () => {

                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                const audioFile = new File([audioBlob], 'audio.wav', { type: 'audio/wav' });              

                const formData = new FormData();
                formData.set('userAccounts', JSON.stringify(userAccounts));
                formData.set('userIncomeBudget', JSON.stringify(userIncomeBudget));
                formData.set('userExpenseBudget', JSON.stringify(userExpenseBudget));
                formData.set('audioFile', audioFile);
                
                const res = await fetch('/api/transaction-voice', {
                    method: 'POST',
                    body:  formData
                });
                const data = await res.json();
                const transactionData = data.transactionData;

                // here is where we set to validate the transaction, an dif it is valid, we set the new transaction
                // And if the validation throws an error, we need to find the field where the error exits and give the user the modal to complete the information fast and easy

                setNewTransaction(transactionData)                
                setActiveButtons(true)
            };
            
            mediaRecorder.start();
            setIsRecording(true)
        })
        .catch((error) => {
            console.error('Error accessing microphone:', error);
        });
    }

    const handleStopRecord = async () => {
        if(!mediaRecorder) return;
        mediaRecorder.stop();
        audioChunks = [];
        setIsRecording(false)
    }


    const handleConfirmTransaction = async () => {
        setActiveButtons(false)

        const response = await fetch('/api/create-transaction', {
            method: 'POST',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTransaction),
        });

        const {transaction} = await response.json();
        console.log(transaction)
        setOpenModal(false)
    }

    const handleDiscardTransaction = () => {
        setOpenModal(false)
        setActiveButtons(false)
        setNewTransaction({
            type: '',
            date: new Date().toISOString(),
            accountFrom: '',
            accountFromId: '',
            subcategoryFrom: '',
            subcategoryFromId: '',
            accountTo: '',
            accountToId: '',
            subcategoryTo: '',
            subcategoryToId: '',
            amount: 0,
            description: ''
        })
    }

    return (
        <>
            <button 
                onMouseDown={handleRecordStart} 
                onMouseUp={handleStopRecord} 
                className='h-[58px] active:h-[68px] w-[58px] active:w-[68px] bg-greenYellow rounded-full flex justify-center items-center'
            >
                <FaMicrophone className="text-[32px] text-black" />
            </button>

            { openModal && (
                <PopUpLayer bottom="bottom-[70px]">
                    <section className="flex flex-col items-center justify-between">
                        <section>
                            <h2 className="flex justify-center mb-2">
                                { isRecording && ('Escuchando...')}
                                { !isRecording && ('Escuchando')}
                            </h2>
                            <div className="mb-5">
                                <h3 className="font-bold mb-2">Tus Cuentas personales:</h3>
                                <ul className="grid grid-cols-3">
                                    { userAccounts?.map((account) => (
                                        <li 
                                            key={account.id}
                                            className="font-thin text-center"    
                                        >{account.title}</li>
                                        ))}
                                </ul>
                            </div>
                            <div className="mb-5">
                                <h3 className="font-bold mb-2">Tus categorias de ingreso:</h3>
                                <ul className="grid grid-cols-3">
                                    { userIncomeBudget?.map((budget) => (
                                        <li 
                                            key={budget.id}
                                            className="font-thin"
                                        >{budget.title}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold mb-2">Tus categorias de egreso:</h3>
                                <ul className="grid grid-cols-3 gap-2">
                                    { userExpenseBudget?.map((budget) => (
                                        <li 
                                            key={budget.id}
                                            className="font-thin text-center text-sm"
                                        >{budget.title}</li>    
                                    ))}                                
                                </ul>
                            </div>
                        </section>
                            <section className="w-full">
                                <Summarytransaction transactionData={newTransaction} showSkeletons={true} />
                                <div className="flex gap-2 mt-4">
                                    { activeButtons && (
                                        <SubmitButton title="Confirmar" buttonType={true} buttonStyle="confirm" onClick={handleConfirmTransaction} />
                                    )}
                                    { !activeButtons && (
                                        <SubmitButton title="Confirmar" buttonType={true} buttonStyle="confirm" desactive={true} />
                                    )}
                                    <SubmitButton title="Cancelar" buttonType={true} buttonStyle="cancel" onClick={handleDiscardTransaction} />
                                </div>
                            </section>
                    </section>
                </PopUpLayer>
            )}
        </>
    )
}

export default ButtonRecorder