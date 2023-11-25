// import {createNewTransaction} from '@/app/lib/action';
// import { NextRequest, NextResponse } from 'next/server'
// import { revalidatePath } from "next/cache"

// type ResponseData = {
//     message: string
// }

// export async function POST( req: NextRequest ) {
//         const { body } = req;
//         const response = await createNewTransaction(body);

//         // return res.json({ message: 'Transacción creada exitosamente' })
        
//         // if(response) res.status(200).json({ message: 'Transacción creada exitosamente' })
//         // else res.status(500).json({ message: 'Error al crear la transacción' })

//         // revalidatePath('/presupuesto-cuentas')
// }



// Esto hay que intentar hacerlo otra vez pero entendiendo muy bien que carajos está pasando y 
// por qué esto es diferente al metodo de pages/api