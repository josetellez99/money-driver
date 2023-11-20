import React from "react"
import FormRegister from "@/components/FormRegister"
import MainDefault from "@/components/MainDefault"
import {fetchUserAccounts, fetchUserBudgetWithSubcategories} from "@/app/lib/action";

const user = {
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

const RegisterPage: React.FC<RegisterPageProps> = async ( {params} ) => {

    const [accounts, incomesCategories, expensesCategories] = await Promise.all([
        fetchUserAccounts(),
        fetchUserBudgetWithSubcategories('income'),
        fetchUserBudgetWithSubcategories('expense'),
    ])

    // We need to translate the slug to the type of register that the server expects in english
    
    const optionsMap = {
        'Ingreso': 'income',
        'Egreso': 'expense',
        'Movimiento': 'movement',
        'Deuda': 'debt',
        'Tarjeta de credito': 'creditCard'
    };

    const option = optionsMap[params.slug] || '';

    return (
        <>
        <MainDefault>
            <FormRegister
                activeRegisterOption={option}
                accounts={accounts}
                incomesCategories={incomesCategories}
                expensesCategories={expensesCategories}
                // debts={debts}
                // saves={saves},
                // creditCards={creditCards}
            />
        </MainDefault>
        </>
    )
}

export default RegisterPage