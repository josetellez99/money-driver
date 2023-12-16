import { NextRequest } from "next/server";
import { getParamsFromUserVoice } from "@/app/lib/voice-assistant";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });



export async function POST(request: NextRequest) {

    const data = await request.formData();
    const transcription = await getAudioTranscription(data.get('audioFile'));



    return Response.json({message: 'Keep calm'})
    
}


async function getAudioTranscription (audioFile: any) {
    const transcription = await openai.audio.transcriptions.create({
        file: audioFile,
        model: 'whisper-1',
    })
    return transcription;
}


const fetch = async () {
    const params = await getParamsFromUserVoice(
        userVoiceTranscription.text,
        userAccountsNames, 
        userIncomeBudgetNames, 
        userExpenseBudgetNames, 
        incomeSubcategoriesnames, 
        expenseSubcategoriesnames
    )
}

