import type { NextApiRequest, NextApiResponse } from 'next'

import OpenAI from "openai";


const API_KEY = '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'
const openai = new OpenAI({ apiKey: API_KEY, dangerouslyAllowBrowser: true });

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === 'POST') {

        const transcription = await getAudioTranscription(req.body);

        if(true) res.status(200).json({ text: 'transcription.text' })
        else res.status(500)
    }
}



async function getAudioTranscription (audioFile: any) {
    console.log('Inside getAudioTranscription')
    const transcription = await openai.audio.transcriptions.create({
        file: audioFile,
        model: 'whisper-1',
    })
    return transcription;
}