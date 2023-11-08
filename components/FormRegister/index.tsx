'use client'

import React from "react"

import FieldsetTypeOfRegister from "@/components/FormRegister/FieldsetTypeOfRegister"
import FieldSetDate from "@/components/FormRegister/FieldSetDate"

import AccountsSection from "@/components/FormRegister/AccountsSection"
import OnIncomeFieldsets from "@/components/FormRegister/AccountsFieldsets/OnIncomeFieldsets"
import OnExpenseFieldsets from "@/components/FormRegister/AccountsFieldsets/OnExpensesFieldsets"
import OnMovementFieldsets from "@/components/FormRegister/AccountsFieldsets/OnMovementFieldsets"
import OnDebtFieldset from "@/components/FormRegister/AccountsFieldsets/OnDebtFieldset";
import AmountFieldset from "@/components/FormRegister/AmountFieldset"
import DescriptionFieldset from "@/components/FormRegister/DescriptionFieldset"
import SubmitButton from "@/components/FormRegister/SubmitButton"
import ToggleButtonsFieldset from "@/components/FormRegister/AccountsFieldsets/ToggleButtonsFieldset"


interface FormRegisterProps {
    registerOptions: ButtonData[]
    activeRegisterOption: string
    userData: any
}

const FormRegister: React.FC<FormRegisterProps> = ({
    registerOptions,
    activeRegisterOption,
    userData
}) => {

    const[currentTransaction, setCurrentTransaction] = React.useState<Transaction>({
        id: Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000,
        type: activeRegisterOption,
        date: new Date(),
        accountFrom: '',
        accountTo: '',
        amount: 0,
        description: '',
    })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log('Submit event')
    }

    const amountFieldsetOnChangehandle = (value: number) => {
        setCurrentTransaction({
            ...currentTransaction,
            amount: value
        })
    }

    const descriptionFieldsetOnChangehandle = (value: string) => {
        setCurrentTransaction({
            ...currentTransaction,
            description: value
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="border py-4 p-2 border-white rounded-md" action="">
                <FieldsetTypeOfRegister
                    typesOfRegister={registerOptions}
                    currentTransaction={currentTransaction}
                    setCurrentTransaction={setCurrentTransaction}
                />
                <FieldSetDate
                    currentTransaction={currentTransaction}
                    setCurrentTransaction={setCurrentTransaction}
                />
                <AccountsSection
                    typeOfRegister={currentTransaction.type}
                    onIncome={() => 
                        <OnIncomeFieldsets 
                            incomesCategories={userData.incomesCategories}
                            userAccounts={userData.accounts}
                            currentTransaction={currentTransaction}
                            setCurrentTransaction={setCurrentTransaction}
                        />}
                    onExpense={() => 
                        <OnExpenseFieldsets 
                            expensesCategories={userData.expensesCategories}
                            userAccounts={userData.accounts}
                            currentTransaction={currentTransaction}
                            setCurrentTransaction={setCurrentTransaction}
                        />}   
                    onMovement={() => 
                        <OnMovementFieldsets 
                            userAccounts={userData.accounts}
                            currentTransaction={currentTransaction}
                            setCurrentTransaction={setCurrentTransaction}
                        />}                    
                    onDebt={() =>
                        <OnDebtFieldset
                            userAccounts={userData.accounts}
                            currentTransaction={currentTransaction}
                            setCurrentTransaction={setCurrentTransaction}
                            userDebts={userData.debts}
                        />}
                    // onSave={}
                    // onCreditCard={}
                />
                <AmountFieldset
                    amount={currentTransaction.amount}
                    onChange={amountFieldsetOnChangehandle}
                />
                <DescriptionFieldset
                    description={currentTransaction.description}
                    onChange={descriptionFieldsetOnChangehandle}
                />
                <SubmitButton 
                    title="Registrar"
                />
            </form>
        </>
    )
}

export default FormRegister



