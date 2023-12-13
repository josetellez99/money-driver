'use client'

import React from "react"

import OpenAI from "openai";
import createTransactionVoicefull from '@/app/lib/test'
import { fetchUserAccounts, fetchUserBudgetWithSubcategories } from '@/app/lib/action'

const API_KEY = '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'
const openai = new OpenAI({ apiKey: API_KEY, dangerouslyAllowBrowser: true });

async function getAudioTranscription (audioFile: any) {
    console.log('Inside getAudioTranscription')
    const transcription = await openai.audio.transcriptions.create({
        file: audioFile,
        model: 'whisper-1',
    })
    return transcription;
}

function joinStrings(stringArray: string[]): string {
    return stringArray.join(', ');
}




let mediaRecorder;
let audioChunks : any = [];

// Hay que dar las posibilidades de cuentas, categorias y subcategorias para que el modelo la encaje con la correcta-8
// Incorporate the correct subcategory for the inputs

const ButtonRecorder = () => {

    const [isRecording, setIsRecording] = React.useState(false)
    
    const[messages, setMessages] = React.useState([{role: 'system', content: 'You are a helpful assistant to create transactions. Dont make assumtions about the values to plug into the functions and ask for clarification to the user.'}])

    const handleRecordClick = async () => {

        // We need to fetch user accounts and categories to pass them to the model 

        const [userAccounts, userIncomeBudget, userExpenseBudget] = await Promise.all([
            fetchUserAccounts(),
            fetchUserBudgetWithSubcategories('income'),
            fetchUserBudgetWithSubcategories('expense')
        ])

        console.log('userAccounts', userAccounts)
        console.log('userIncomeBudget', userIncomeBudget)
        console.log('userExpenseBudget', userExpenseBudget)

        const userAccountsNamesArray = userAccounts.map((account) => account.title)
        const userIncomeBudgetNamesArray = userIncomeBudget.map((budget) => budget.title)
        const userExpenseBudgetNamesArray = userExpenseBudget.map((budget) => budget.title)

        

        

        const userAccountsNames = joinStrings(userAccountsNamesArray)
        const userIncomeBudgetNames = joinStrings(userIncomeBudgetNamesArray)
        const userExpenseBudgetNames = joinStrings(userExpenseBudgetNamesArray)

        


        const chat = async (messages: [{role: string, content: string}]) =>  {
            const response = await openai.chat.completions.create({
                messages: messages,
                model: "gpt-3.5-turbo",
                tools: [
                    {
                        type: 'function',
                        function: {
                            name: 'createTransactionVoicefull',
                            description: 'Take the user inputs to create a transaction',
                            parameters: {
                                type: 'object',
                                properties: {
                                    type: {
                                        type: "string",
                                        description: "Type of transaction, it could be 'income' or 'expense' or 'movement'",
                                    },
                                    date: {
                                        type: "string",
                                        description: "Date of the transaction, is a javascript Date object",
                                    },
                                    AccountFrom: {
                                        type: "string",
                                        description: `Where the money is going out. 
                                                    You are force to match the user inputs with one the following options taking into account the structure from teh different type of cases described next. 
                                                    Accounts: ${userAccountsNames} 
                                                    Income categories: ${userIncomeBudgetNames}
                                                    Expense categories: ${userExpenseBudgetNames}
                                                    There are different transaction types cases:
                                                    Type income: money is going in from an income category to an account
                                                    Type expense: money is going out from an account to an expense category
                                                    Type movement: money is going out from an account to another account.
                                                    `,
                                    },
                                    // subcategoryFrom: {
                                    //     type: "string",
                                    //     description: "Subcategory from which the money is going out",
                                    // },
                                    AccountTo: {
                                        type: "string",
                                        description: `Where the money is going out. 
                                                    You are force to match the user inputs with one the following options taking into account the structure from teh different type of cases described next. 
                                                    Accounts: ${userAccountsNames} 
                                                    Income categories: ${userIncomeBudgetNames}
                                                    Expense categories: ${userExpenseBudgetNames}
                                                    There are different transaction types cases:
                                                    Type income: money is going in from an income category to an account
                                                    Type expense: money is going out from an account to an expense category
                                                    Type movement: money is going out from an account to another account.
                                                    `,
                                    },
                                    // subcategoryTo: {
                                    //     type: "string",
                                    //     description: "Subcategory to which the money is going in",
                                    // },
                                    amount: {
                                        type: "number",
                                        description: "Amount of money of the transaction",
                                    },
                                    description: {
                                        type: "string",
                                        description: "Description of the transaction",
                                    },
                                }
                            }
                        },
                    },
                ]
            });     
            
            console.log('response', response)
            console.log(response.choices[0].message.tool_calls[0].function.name)
            console.log(response.choices[0].message.tool_calls[0].function.arguments)


            setMessages([...messages, {role: response.choices[0].message.role, content: response.choices[0].message.content!}])
        }

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

                const transcription = await getAudioTranscription(audioFile);
                setMessages([...messages, {role: 'user', content: transcription.text}])

                await chat([...messages, {role: 'user', content: transcription.text}])


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

    const handleStopClick = () => {
        mediaRecorder.stop();
        setIsRecording(false)
        audioChunks = [];
    }

    return (
        <>
            { isRecording && (
                <div>
                    <button
                        className="bg-red-500"
                        onClick={handleStopClick}
                    >Stop</button>
                </div>
            )}

            { !isRecording && (
                <div>
                    <button
                        className="bg-green-500"
                        onClick={handleRecordClick}
                    >Record</button>
                </div>
            )}
        </>
    )
}

export default ButtonRecorder