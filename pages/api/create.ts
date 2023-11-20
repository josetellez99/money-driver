import {createNewTransaction} from '@/app/lib/action';
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method === 'POST') {
        const { body } = req;
        const transaction = await createNewTransaction(body);
        if(transaction) res.status(200).json({ message: 'Transacción creada exitosamente' })
    }
}