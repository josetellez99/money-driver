import React from "react"
import FormRegister from "@/components/FormRegister"
import MainDefault from "@/components/MainDefault"
import useNavigation from "next/navigation"

const registerOptions = [
    { title: 'Ingreso', id: 1},
    { title: 'Egreso', id: 2},
    { title: 'Movimiento', id: 3},
    // { title: 'Ahorro', id: 4},
    { title: 'Deuda', id: 5},
    { title: 'Tarjeta de credito', id: 6},
]

const user = {
    accounts: [
        {
            title: 'Efectivo',
            id: 1
            
        },
        {
            title: 'Daviplata',
            id: 2
        },
        {
            title: 'Nequi',
            id: 3
        }
    ],
    incomesCategories: [
        {
            title: 'Sueldo en Rappi',
            id: 1
        },
        {
            title: 'Pagos de freelancer',
            id: 2
        },
        {
            title: 'Apto en arriendo',
            id: 3
        }
    ],
    expensesCategories : [
        {
            title: 'Arriendo',
            id: 1
        },
        {
            title: 'Comida',
            id: 2
        },
        {
            title: 'Ayuda a la familia',
            id: 3
        },
        {
            title: 'Personales',
            id: 4
        },
        {
            title: 'Moto',
            id: 5
        },
        {
            title: 'Otros',
            id: 6
        },
        {
            title: 'Trabajo',
            id: 7
        },
        {
            title: 'Dulces',
            id: 8
        }
    ],
    debts: [
        {
            toPay: true,
            id: 1,
            title: 'Tarjeta de credito',
            totalAmount: 1350000,
            paidAmount: 200000,
            createdRecordDay: new Date(),
            debtStartDay: new Date(),
            description: 'Esta es una deuda inteligente para invertir Esta es una deuda inteligente para invertir Esta es una deuda inteligente para invertir Esta es una deuda inteligente para invertir Esta es una deuda inteligente para invertir Esta es una deuda inteligente para invertir',
            paymentPlan: {
                byMonths: true,
                byAmount: false,
                monthsToPay: 10,
                monthlyRate: false,
                yearlyRate: true,
                ratePercentage: 40,
                monthToStartToPay: new Date
            },
            paymentRecord : {
                
            }
        },
        {
            toPay: true,
            id: 2,
            title: 'Tarjeta de credito',
            totalAmount: 500000,
            paidAmount: 350000,
            createdRecordDay: new Date(),
            debtStartDay: new Date(),
            description: 'Esta es una deuda inteligente para invertir Esta es una deuda inteligente para invertir Esta es una deuda inteligente para invertir Esta es una deuda inteligente para invertir Esta es una deuda inteligente para invertir Esta es una deuda inteligente para invertir',
            paymentPlan: {
                byMonths: true,
                byAmount: false,
                monthsToPay: 10,
                monthlyRate: false,
                yearlyRate: true,
                ratePercentage: 40,
                monthToStartToPay: new Date
            },
            paymentRecord : {
                
            }
        },
        {
            toPay: true,
            id: 3,
            title: 'Tarjeta de credito para pagar por todas las cosas que adquirí cuando me vine a vivir a esta hermosa ciudad',
            totalAmount: 12000000,
            paidAmount: 1000000,
            createdRecordDay: new Date(),
            debtStartDay: new Date(),
            description: 'Esta es una deuda inteligente para invertir Esta es una deuda inteligente para invertir Esta es una deuda inteligente para invertir Esta es una deuda inteligente para invertir Esta es una deuda inteligente para invertir Esta es una deuda inteligente para invertir',
            paymentPlan: {
                byMonths: true,
                byAmount: false,
                monthsToPay: 10,
                monthlyRate: false,
                yearlyRate: true,
                ratePercentage: 40,
                monthToStartToPay: new Date
            },
            paymentRecord : {
                
            }
        },
        {
            toPay: true,
            id: 4,
            title: 'Tarjeta de credito para pagar por todas las cosas que adquirí cuando me vine a vivir a esta hermosa ciudad',
            totalAmount: 1000000,
            paidAmount: 800000,
            createdRecordDay: new Date(),
            debtStartDay: new Date(),
            description: 'Esta es una deuda inteligente para invertir Esta es una deuda inteligente para invertir Esta es una deuda inteligente para invertir Esta es una deuda inteligente para invertir Esta es una deuda inteligente para invertir Esta es una deuda inteligente para invertir',
            paymentPlan: {
                byMonths: true,
                byAmount: false,
                monthsToPay: 10,
                monthlyRate: false,
                yearlyRate: true,
                ratePercentage: 40,
                monthToStartToPay: new Date
            },
            paymentRecord : {
                
            }
        },
        {
            toPay: false,
            id: 5,
            title: 'Tarjeta de credito para pagar por todas las cosas que adquirí cuando me vine a vivir a esta hermosa ciudad',
            totalAmount: 40,
            paidAmount: 30,
            createdRecordDay: new Date(),
            debtStartDay: new Date(),
            description: 'Esta es una deuda inteligente para invertir Esta es una deuda inteligente para invertir Esta es una deuda inteligente para invertir Esta es una deuda inteligente para invertir Esta es una deuda inteligente para invertir Esta es una deuda inteligente para invertir',
            paymentPlan: {
                byMonths: true,
                byAmount: false,
                monthsToPay: 10,
                monthlyRate: false,
                yearlyRate: true,
                ratePercentage: 40,
                monthToStartToPay: new Date
            },
            paymentRecord : {
                
            }
        },
        {
            toPay: false,
            id: 6,
            title: 'Tarjeta de credito para pagar por todas las cosas que adquirí cuando me vine a vivir a esta hermosa ciudad',
            totalAmount: 100,
            paidAmount: 98,
            createdRecordDay: new Date(),
            debtStartDay: new Date(),
            description: 'Esta es una deuda inteligente para invertir Esta es una deuda inteligente para invertir Esta es una deuda inteligente para invertir Esta es una deuda inteligente para invertir Esta es una deuda inteligente para invertir Esta es una deuda inteligente para invertir',
            paymentPlan: {
                byMonths: true,
                byAmount: false,
                monthsToPay: 10,
                monthlyRate: false,
                yearlyRate: true,
                ratePercentage: 40,
                monthToStartToPay: new Date
            },
            paymentRecord : {
                
            }
        }
    ]
}

interface RegisterPageProps {
    params: {
        slug: string
    }
}

const RegisterPage: React.FC<RegisterPageProps> = ( {params} ) => {

    return (
        <>
        <MainDefault>
            <FormRegister
                registerOptions={registerOptions}
                activeRegisterOption={params.slug} 
                userData={user}
            />
        </MainDefault>
        </>
    )
}

export default RegisterPage