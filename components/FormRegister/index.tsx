'use client'

import React from "react"

import RegisterOptionFieldset from "@/components/FormRegister/RegisterOptionFieldset"
import AccountsSection from "@/components/FormRegister/AccountsSection"
import OnIncomeFieldsets from "@/components/FormRegister/AccountsFieldsets/OnIncomeFieldsets"
import OnExpenseFieldsets from "@/components/FormRegister/AccountsFieldsets/OnExpensesFieldsets"
import OnMovementFieldsets from "@/components/FormRegister/AccountsFieldsets/OnMovementFieldsets"
import OnDebtFieldset from "@/components/FormRegister/AccountsFieldsets/OnDebtFieldset";
import AmountFieldset from "@/components/FormRegister/AmountFieldset"
import DescriptionFieldset from "@/components/FormRegister/DescriptionFieldset"
import SubmitButton from "@/components/FormRegister/SubmitButton"
import DateFieldSet from "@/components/FormRegister/DateFieldset"
import ToggleButtonsFieldset from "@/components/FormRegister/AccountsFieldsets/ToggleButtonsFieldset"

const registerOptions = [
    { title: 'Ingreso', id: 1},
    { title: 'Egreso', id: 2},
    { title: 'Movimiento', id: 3},
    { title: 'Ahorro', id: 4},
    { title: 'Deuda', id: 5},
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
            debtID: 1,
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
            debtID: 2,
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
            debtID: 3,
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
            debtID: 4,
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
            debtID: 5,
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
            debtID: 6,
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

interface FormRegisterProps {
    activeOption: string
}

const FormRegister: React.FC<FormRegisterProps> = ({ activeOption }) => {

    const [activeRegisterOption, setActiveRegisterOption] = React.useState<string>(activeOption)
    const [date, setDate] = React.useState<Date>(new Date)
    const [accountFrom, setAccountFrom] = React.useState<string | undefined>(undefined)
    const [accountTo, setAccountTo] = React.useState<string | undefined>(undefined)
    const [amount, setAmount] = React.useState<number | undefined>(undefined)
    const [description, setDescription] = React.useState<string>('')
    const [selectedDebt, setSelectedDebt] = React.useState<number | undefined>()
    const [activeToggleButton, setActiveToggleButton] = React.useState<string>('')

    const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log('Submit event')
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="border py-4 p-2 border-white rounded-md" action="">
                <RegisterOptionFieldset
                    registerOptions={registerOptions}
                    activeRegisterOption={activeRegisterOption}
                    setActiveRegisterOption={setActiveRegisterOption}
                />
                <DateFieldSet
                    date={date}
                    setDate={setDate}
                />
                <ToggleButtonsFieldset
                    activeRegisterOption={activeRegisterOption}
                    activeToggleButton={activeToggleButton}
                    setActiveToggleButton={setActiveToggleButton}
                />
                <AccountsSection
                    activeRegisterOption={activeRegisterOption}
                    onIncome={() => 
                        <OnIncomeFieldsets 
                            incomesCategories={user.incomesCategories}
                            userAccounts={user.accounts}
                            accountFrom={accountFrom}
                            setAccountFrom={setAccountFrom}
                            accountTo={accountTo}
                            setAccountTo={setAccountTo}
                        />}
                    onExpense={() => 
                        <OnExpenseFieldsets 
                            expensesCategories={user.expensesCategories}
                            userAccounts={user.accounts}
                            accountFrom={accountFrom}
                            setAccountFrom={setAccountFrom}
                            accountTo={accountTo}
                            setAccountTo={setAccountTo}
                        />}   
                    onMovement={() => 
                        <OnMovementFieldsets 
                            userAccounts={user.accounts}
                            accountFrom={accountFrom}
                            setAccountFrom={setAccountFrom}
                            accountTo={accountTo}
                            setAccountTo={setAccountTo}
                        />}                    
                    onDebt={() =>
                        <OnDebtFieldset
                            userAccounts={user.accounts}
                            accountTo={accountTo}
                            setAccountTo={setAccountTo}
                            userDebts={user.debts}
                            selectedDebt={selectedDebt}
                            setSelectedDebt={setSelectedDebt}
                            activeToggleButton={activeToggleButton}
                        />}
                    // onSave={}
                    // onCreditCard={}
                />
                <AmountFieldset
                    amount={amount}
                    setAmount={setAmount}
                />
                <DescriptionFieldset
                    description={description}
                    setDescription={setDescription}
                />
                <SubmitButton 
                    title="Registrar"
                />
            </form>
        </>
    )
}

export default FormRegister



