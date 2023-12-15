'use client'

import React from "react"

import OpenAI from "openai";
import createTransactionVoicefull from '@/app/lib/test'
import { fetchUserAccounts, fetchUserBudgetWithSubcategories } from '@/app/lib/action'
import { getParamsFromUserVoice } from "@/app/lib/voice-assistant";
import Summarytransaction from "@/components/SummaryTransaction";
import SubmitButton from "@/components/FormRegister/SubmitButton";
import { FaArrowRight } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";


import PopUpLayer from "@/components/PopupLayer";


const API_KEY = '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'
const openai = new OpenAI({ apiKey: API_KEY, dangerouslyAllowBrowser: true });



// La experiencia es que cuando des click lo que pasará es que se mostrará el modal.
// Vamos a seguir trabajando en esa funcionalidad y vamos a mostrar el modal y debajo la barra.
// Algo que será muy interesante será incorporar las ultimas transacciones en tiempo real y añadirlas a la lista en el home, eso será sublime
// Entonces hagamos al experiencia escueta y con botones y luego tood automatico
// Puedes tener algo para que se grabe el audio hasta que la información esté completa y allí se detenga y se habiliten los bbotones de confirmar o descartar
// Manejar el error de cuando el usuario no dice nada
// No puede ser que nos gastemos una petición cada vez que se unde ese botóm, eso es muy costoso. Lo haremos en la pagina al inicio.
// Solo activar los botones cuando la información esté completa
// Cómo rellenar los campos si el usuario no los nombró
// Que se grabe mientras el botón está pulsado



async function getAudioTranscription (audioFile: any) {
    const transcription = await openai.audio.transcriptions.create({
        file: audioFile,
        model: 'whisper-1',
    })
    return transcription;
}

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

    console.log(newTransaction)

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

                const userVoiceTranscription = await getAudioTranscription(audioFile);

                const params = await getParamsFromUserVoice(
                    userVoiceTranscription.text,
                    userAccountsNames, 
                    userIncomeBudgetNames, 
                    userExpenseBudgetNames, 
                    incomeSubcategoriesnames, 
                    expenseSubcategoriesnames
                )

                console.log(params)

                const newTransactionFromVoice = getNewTransactionDataFromVoice(params, userAccounts, userIncomeBudget, userExpenseBudget)

                console.log(newTransactionFromVoice)
                setNewTransaction(newTransactionFromVoice)
                setActiveButtons(true)


                // const formData = new FormData();
                // formData.append('audioFile', audioFile);
                
                
                // const res = await fetch('/api/send-audio', {
                //     method: 'POST',
                //     body:  formData
                // });
                // const data = await res.json();


                
            };
            
            mediaRecorder.start();
            setIsRecording(true)
        })
        .catch((error) => {
            console.error('Error accessing microphone:', error);
        });
    }

    const handleStopRecord = () => {
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
                            <p className="flex flex-col opacity-90">
                                <span className="text-center mb-4">Mantén pulsado el botón y menciona lo siguiente para registrar una transacción:</span>

                                <p className="flex items-center mb-2">
                                    <FaArrowRight className="text-greenYellow mr-2" />
                                    <span>¿Es un ingreso, egreso o movimiento?</span>
                                </p>
                                <p className="flex items-center mb-2">
                                    <FaArrowRight className="text-greenYellow mr-2" />
                                    <span>¿Qué cuentas y categorias están en la transacción?</span>
                                </p>
                                <p className="flex items-center mb-2">
                                    <FaArrowRight className="text-greenYellow mr-2" />
                                    <span>Monto de la transacción</span>
                                </p>
                                <p className="flex items-center mb-2">
                                    <FaArrowRight className="text-greenYellow mr-2" />
                                    <span>Descripción de la transacción</span>
                                </p>
                            </p>
                        </section>
                        {/* <section>
                            { isRecording && (
                                <p>Estoy escuchando</p>
                            )}
                        </section> */}
                        <section className="w-full">
                            <Summarytransaction transactionData={newTransaction} showSkeletons={true} />
                            <div className="mt-4">
                                { activeButtons && (
                                    <>
                                        <SubmitButton title="Confirmar" buttonType={true} buttonStyle="confirm" onClick={handleConfirmTransaction} />
                                        <SubmitButton title="Descartar" buttonType={true} buttonStyle="cancel" onClick={handleDiscardTransaction} />
                                    </>
                                )}
                                { !activeButtons && (
                                    <>
                                        <SubmitButton title="Confirmar" buttonType={true} buttonStyle="confirm" desactive={true} />
                                        <SubmitButton title="Descartar" buttonType={true} buttonStyle="cancel" desactive={true} />
                                    </>
                                )}
                            </div>
                        </section>
                    </section>
                </PopUpLayer>
            )}
        </>
    )
}

export default ButtonRecorder