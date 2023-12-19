import { NextRequest } from "next/server";
import { getParamsFromUserVoice, getCategoriesNamesAsString, getSubcategoriesNamesAsString, getNewTransactionDataFromVoice, getAudioTranscription } from "@/app/lib/voice-assistant";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


export async function POST(request: NextRequest) {

    const data = await request.formData();

    // We need the user data from the client side in json format

    const userAccounts = JSON.parse(data.get('userAccounts') as string)
    const userIncomeBudget = JSON.parse(data.get('userIncomeBudget') as string)
    const userExpenseBudget = JSON.parse(data.get('userExpenseBudget') as string)

    // We need the names of the accounts, incomes and expenses as a single string where each account is separete by commas to pass it to the model. It'll serve as instructions for GPT.

    const userAccountsNames = getCategoriesNamesAsString(userAccounts)
    const userIncomeBudgetNames = getCategoriesNamesAsString(userIncomeBudget)
    const userExpenseBudgetNames = getCategoriesNamesAsString(userExpenseBudget)
    const incomeSubcategoriesnames = getSubcategoriesNamesAsString(userIncomeBudget)
    const expenseSubcategoriesnames = getSubcategoriesNamesAsString(userExpenseBudget)

    // We need the transacription of the audio file
    const transcription = await getAudioTranscription(data.get('audioFile'));

    if(!transcription) {
        return Response.json({message: 'There was an error with the transcription'})
    }

    // We pass all that information and get the params in a string format

    const functionParams = await getParamsFromUserVoice(
        transcription.text,
        userAccountsNames,
        userIncomeBudgetNames,
        userExpenseBudgetNames,
        incomeSubcategoriesnames,
        expenseSubcategoriesnames
    )

    // Here we're validating that the model has generated the params, if not, we return an error

    if(!functionParams) {
        return Response.json({message: 'There was an error with the transcription'})
    }

    // We get the new transaction in the correct format with the information organized

    const transactionData = getNewTransactionDataFromVoice(
        functionParams,
        userAccounts,
        userIncomeBudget,
        userExpenseBudget
    )

    return Response.json({transactionData: transactionData})
    
}
