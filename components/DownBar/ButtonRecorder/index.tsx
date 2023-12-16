'use client'

import React from "react"

import OpenAI from "openai";
import createTransactionVoicefull from '@/app/lib/test'
import { fetchUserAccounts, fetchUserBudgetWithSubcategories } from '@/app/lib/action'
import Summarytransaction from "@/components/SummaryTransaction";
import SubmitButton from "@/components/FormRegister/SubmitButton";
import { FaMicrophone } from "react-icons/fa";
import PopUpLayer from "@/components/PopupLayer";


function joinStrings(stringArray: string[]): string {
    return stringArray.join(', ');
}

const getNamesAsString = (array: any[]) => {
    const itemsArray = array.map((account) => account.title)
    const namesString = joinStrings(itemsArray)
    return namesString
}

const getSubcategoriesNamesAsString = (array: any[]) => {
    const itemsArray = array.filter((budget: BudgetItem) => budget.subcategories?.length! > 0)
    const namesArray = itemsArray.map( (budget: BudgetItem) => {
        return { category: budget.title, subcategories: joinStrings(budget.subcategories?.map((subcategory: BudgetItem) => subcategory.title)) }
    })

    const namesString = namesArray.map(item => `Categoria: ${item.category}. Subcategorias: ${item.subcategories}.`).join(', ');

    if(namesString.length === 0) {
        return 'There is not categories with subcategories'
    }

    return namesString;
}

const findElementIdByTitle = (itemsArray: UserAccount[] | BudgetItem[], titleToFind: string) => {
    const itemFound = itemsArray.find((item) => item.title === titleToFind)
    if(itemFound) {
        return itemFound.id
    }
    return ''
}

const findSubcategory = (budget: BudgetItem[], parentCategory: string, subcategoryToFind: string) => {
    const budgetItem = budget.find((item) => item.title === parentCategory)
    if(budgetItem) {
        const subcategoryItem = budgetItem.subcategories?.find((subcategory) => subcategory.title === subcategoryToFind)
        if(subcategoryItem) {
            return subcategoryItem.id
        }
    }
    return ''
} 

const getNewTransactionDataFromVoice = (params: any, userAccount: UserAccount[], userIncomeBudget: BudgetItem[], userExpenseBudget: BudgetItem[]) => {

    if(params.type === 'income') {

        const subcategoryID = findSubcategory(userExpenseBudget, params.accountTo, params.subcategoryTo)

        return {
            type: params.type,
            date: new Date().toISOString(),
            accountFrom: params.accountFrom,
            accountFromId: findElementIdByTitle(userIncomeBudget, params.accountFrom),
            subcategoryFrom: params.subcategoryFrom,
            subcategoryFromId: subcategoryID,
            accountTo: params.accountTo,
            accountToId: findElementIdByTitle(userAccount, params.accountTo),
            amount: params.amount,
            description: params.description
        } 
    } else if (params.type === 'expense') {

        const subcategoryID = findSubcategory(userExpenseBudget, params.accountTo, params.subcategoryTo)

        return {
            type: params.type,
            date: new Date().toISOString(),
            accountFrom: params.accountFrom,
            accountFromId: findElementIdByTitle(userAccount, params.accountFrom),
            accountTo: params.accountTo,
            accountToId: findElementIdByTitle(userExpenseBudget, params.accountTo),
            subcategoryTo: params.subcategoryTo,
            subcategoryToId: subcategoryID,
            amount: params.amount,
            description: params.description
        }
    } else if (params.type === 'movement') {
        return {
            type: params.type,
            date: new Date().toISOString(),
            accountFrom: params.accountFrom,
            accountFromId: findElementIdByTitle(userAccount, params.accountFrom),
            accountTo: params.accountTo,
            accountToId: findElementIdByTitle(userAccount, params.accountTo),
            amount: params.amount,
            description: params.description
        }
    }
}


let mediaRecorder;
let audioChunks : any = [];

const ButtonRecorder = () => {

    const [isRecording, setIsRecording] = React.useState(false)
    const[openModal, setOpenModal] = React.useState(false)

    const[userAccounts, setUserAccounts] = React.useState<UserAccount[]>([])
    const[userIncomeBudget, setUserIncomeBudget] = React.useState<BudgetItem[]>([])
    const[userExpenseBudget, setUserExpenseBudget] = React.useState<BudgetItem[]>([])
    const[activeButtons, setActiveButtons] = React.useState<boolean>(false)

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

        const userAccountsNames = getNamesAsString(userAccounts)
        const userIncomeBudgetNames = getNamesAsString(userIncomeBudget)
        const userExpenseBudgetNames = getNamesAsString(userExpenseBudget)
        const incomeSubcategoriesnames = getSubcategoriesNamesAsString(userIncomeBudget)
        const expenseSubcategoriesnames = getSubcategoriesNamesAsString(userExpenseBudget)
        
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

                const newTransactionFromVoice = getNewTransactionDataFromVoice(params, userAccounts, userIncomeBudget, userExpenseBudget)

                console.log(newTransactionFromVoice)
                setNewTransaction(newTransactionFromVoice)
                setActiveButtons(true)


                const formData = new FormData();
                formData.set('username', 'Chris');
                formData.set('audioFile', audioFile);
                
                
                const res = await fetch('/api/transaction-voice', {
                    method: 'POST',
                    body:  formData
                });
                const data = await res.json();


                
            };
            
            mediaRecorder.start();
            setIsRecording(true)
        })
        .catch((error) => {
            console.error('Error accessing microphone:', error);
        });
    }

    const handleStopRecord = async () => {
        mediaRecorder.stop();
        audioChunks = [];
        setIsRecording(false)
    }


    const handleConfirmTransaction = () => {
        setActiveButtons(false)
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