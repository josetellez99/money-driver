import {updateUserAccount} from '@/app/lib/action';
import type { NextApiRequest, NextApiResponse } from 'next'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

type ResponseData = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method === 'POST') {
        const { body } = req;
        const response = await updateUserAccount(body.currentAccount, body.adjustmentTransferInfo);
        
        // if(response) res.status(200).json({ message: 'Transacción creada exitosamente' })
        // else res.status(500).json({ message: 'Error al crear la transacción' })  
        
    }
}