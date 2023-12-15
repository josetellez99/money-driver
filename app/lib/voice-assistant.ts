import OpenAI from "openai";

const API_KEY = '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'
const openai = new OpenAI({ apiKey: API_KEY, dangerouslyAllowBrowser: true });

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


    const responseAsObject = JSON.parse(response.choices[0].message.tool_calls[0].function.arguments)
    return responseAsObject

}

