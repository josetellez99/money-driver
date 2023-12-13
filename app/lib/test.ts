import { createNewTransaction } from "@/app/lib/action";

export default function createTransactionVoicefull ({
    type, 
    date, 
    accountFrom, 
    // accountFromId, 
    subcategoryFrom, 
    // subcategoryFromId, 
    accountTo, 
    // accountToId, 
    subcategoryTo, 
    // subcategoryToId, 
    amount, 
    description} : Transaction) {

    const newTransaction = {
        type, 
        date, 
        accountFrom, 
        // accountFromId, 
        subcategoryFrom, 
        // subcategoryFromId, 
        accountTo, 
        // accountToId, 
        subcategoryTo, 
        // subcategoryToId, 
        amount, 
        description
    }

    createNewTransaction(newTransaction);

}


export const chat = async (messages: [{role: string, content: string}]) =>  {
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
                            type: 'Object',
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
                                    description: "Account from which the money is going out",
                                },
                                subcategoryFrom: {
                                    type: "string",
                                    description: "Subcategory from which the money is going out",
                                },
                                AccountTo: {
                                    type: "string",
                                    description: "Account to which the money is going in",
                                },
                                subcategoryTo: {
                                    type: "string",
                                    description: "Subcategory to which the money is going in",
                                },
                                amount: {
                                    type: "number",
                                    description: "Amount of money",
                                },
                                description: {
                                    type: "string",
                                    description: "Description of the transaction",
                                },
                            }
                        }
                    },
                }
            ]
    });        
    setMessages([...messages, {role: response.choices[0].message.role, content: response.choices[0].message.content!}])
}

