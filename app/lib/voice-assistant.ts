// This file contain the logic to the voice assistant work

import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// This function receives the audio file record by the user and return the transcription

export async function getAudioTranscription (audioFile: any) {
    const transcription = await openai.audio.transcriptions.create({
        file: audioFile,
        model: 'whisper-1',
    })
    return transcription;
}

// This is the function that receives the transcription and use GPT api to get the params we need to create a transaction.
// The other params this function receives are instructions to the model to get the correct params 

export const getParamsFromUserVoice = async (
    userVoiceTranscript: string,
    userAccountsNames: string,
    userIncomeBudgetNames: string,
    userExpenseBudgetNames: string,
    incomeSubcategoriesnames: string,
    expenseSubcategoriesnames: string
) =>  {


    const response = await openai.chat.completions.create({
        messages: [
            {role: 'system', content: 'You are a helpful assistant to interpretate the data we need to create a transaction. The user will tell you in natural language the trasaction he made and you are force to extract and match the correspondent data with each property we need to create a transaction correctly. I will provide you with the different options you have to match with the user input. Dont make assumtions about the values to plug into the functions and ask for clarification to the user'},
            {role: 'user', content: userVoiceTranscript},
        ],
        model: "gpt-3.5-turbo",
        temperature: 0,
        tools: [
            {
                type: 'function',
                function: {
                    name: 'createTransactionVoicefull',
                    description: 'Take the user content to get the data to create a transaction. This is a finalcial transaction where money going out from an account, income or expense category to an expense category or account.',
                    parameters: {
                        type: 'object',
                        properties: {
                            type: {
                                type: "string",
                                description: "Type of transaction, it could be 'income' or 'expense' or 'movement'",
                            },
                            accountFrom: {
                                type: "string",
                                description: `Where the money is going out.
                                            From the user content, You are force to get the name of the account, income or expense category where the money is going out in this transaction and find it into with one the following accounts, incomes or expenses categories options. What you find is what will be the value of this property. 
                                            Accounts: ${userAccountsNames} 
                                            Income categories: ${userIncomeBudgetNames}
                                            Expense categories: ${userExpenseBudgetNames}
                                            If the user input doesn't match with any of the following options, fill this field with 'Undefined'
                                            Take into account the structure from the different type of cases described next.
                                            There are different transaction types cases:
                                            Type income: money is going in from an income category to an account
                                            Type expense: money is going out from an account to an expense category
                                            Type movement: money is going out from an account to another account.
                                            `,
                            },
                            subcategoryFrom: {
                                type: "string",
                                description: `The subcategory related with the accountFrom category or account, from which the money is going out
                                            You are force to match the user inputs with one the following options of subcategories taking into account not all categories have subcategories. If the category doesn't have subcategory, fill this field with an empty string ''. Next I'm gonna describe what categories have subcategories:
                                            Income categories that have subcategories : ${incomeSubcategoriesnames}.
                                            Expense categories that have subcategories : ${expenseSubcategoriesnames}.
                                            Take into account the structure from the different types of cases I'm gonna describe
                                            There are different transaction types cases:
                                            Type income: money is going in from an income category to an account
                                            Type expense: money is going out from an account to an expense category
                                            Type movement: money is going out from an account to another account.
                                `,
                            },
                            accountTo: {
                                type: "string",
                                description: `Where the money is going in.
                                            From the user content, You are force to get the name of the account, income or expense category toward the money is going in in this transaction and find it into with one the following accounts, incomes or expenses categories options. What you find is what will be the value of this property. 
                                            Accounts: ${userAccountsNames} 
                                            Income categories: ${userIncomeBudgetNames}
                                            Expense categories: ${userExpenseBudgetNames}
                                            If the user input doesn't match with any of the following options, fill this field with 'Undefined'
                                            Take into account the structure from the different type of cases described next.
                                            There are different transaction types cases:
                                            Type income: money is going in from an income category to an account
                                            Type expense: money is going out from an account to an expense category
                                            Type movement: money is going out from an account to another account.
                                `,
                            },
                            subcategoryTo: {
                                type: "string",
                                description: `The subcategory related with the accountTo category or account, from which the money is going in
                                            You are force to match the user inputs with one the following options of subcategories taking into account not all categories have subcategories. If the category doesn't have subcategory, fill this field with an empty''. Next I'm gonna describe what categories have subcategories:
                                            Income categories that have subcategories : ${incomeSubcategoriesnames}.
                                            Expense categories that have subcategories : ${expenseSubcategoriesnames}.
                                            Take into account the structure from the different types of cases I'm gonna describe
                                            There are different transaction types cases:
                                            Type income: money is going in from an income category to an account
                                            Type expense: money is going out from an account to an expense category
                                            Type movement: money is going out from an account to another account.
                                `,
                            },
                            amount: {
                                type: "number",
                                description: "Amount of money of the transaction",
                            },
                            description: {
                                type: "string",
                                description: "You are force to include a description of the transaction based on the context from the user input",
                            },
                        }
                    }
                },
            },
        ]
    });

    if (response) {
        const choices = response.choices;
        if (choices && choices[0]) {
            const message = choices[0].message;
            if (message && message.tool_calls && message.tool_calls[0]) {
                const args = message.tool_calls[0].function.arguments;
                if (args) {
                    const responseAsObject = JSON.parse(args);
                    return responseAsObject;
                }
            }
        }
    }
}

// This function receives an array of strings and return a single string with all the elements of the array separated by commas
// Is an utility we need in the logic

function joinStrings(stringArray: string[] | undefined): string {
    if(!stringArray) {
        return ''
    }
    return stringArray.join(', ');
}

// This function receives an array of objects and return a single string with all the titles of the Accounts or Budget items separated by commas

export const getCategoriesNamesAsString = (array: UserAccount[] | BudgetItem[]) => {
    const itemsArray = array.map((item) => item.title)
    const namesString = joinStrings(itemsArray)
    return namesString
}

// This function receives the array of suncategories and return a single string with the parent category name and all the subcategories of the Budget items separated by commas

export const getSubcategoriesNamesAsString = (array: BudgetItem[]) => {
    const itemsArray = array.filter((budget) => budget.subcategories?.length! > 0)
    const namesArray = itemsArray.map( (budget) => {
        return { category: budget.title, subcategories: joinStrings(budget.subcategories?.map((subcategory: BudgetItem) => subcategory.title)) }
    })

    const namesString = namesArray.map(item => `Categoria: ${item.category}. Subcategorias: ${item.subcategories}.`).join(', ');

    if(namesString.length === 0) {
        return 'There is not categories with subcategories'
    }

    return namesString;
}

// This function receives an array of objects and a title to find and return the id of the object with the title
// We need this to set the account id in the transaction object

const findElementIdByTitle = (itemsArray: UserAccount[] | BudgetItem[], titleToFind: string) => {
    const itemFound = itemsArray.find((item) => item.title === titleToFind)
    if(itemFound) {
        return itemFound.id
    }
    return ''
}

// This function receives an array of objects and a title to find and return the id of the subcategory object with the title
// We need this to set the subcategory id in the transaction object

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


// This function receives the raw params and return the Transaction object with the correct information for each case

export const getNewTransactionDataFromVoice = (params: any, userAccount: UserAccount[], userIncomeBudget: BudgetItem[], userExpenseBudget: BudgetItem[]) => {

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
