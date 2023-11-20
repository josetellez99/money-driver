'use client'

import React from "react"

import FieldsetTypeOfRegister from "@/components/FormRegister/FieldsetTypeOfRegister"
import FieldSetDate from "@/components/FormRegister/FieldSetDate"

import AccountsFieldset from "@/components/FormRegister/AccountsFieldset"
import OnIncomeFieldsets from "@/components/FormRegister/AccountsFieldsets/OnIncomeFieldsets"
import OnExpenseFieldsets from "@/components/FormRegister/AccountsFieldsets/OnExpensesFieldsets"
import OnMovementFieldsets from "@/components/FormRegister/AccountsFieldsets/OnMovementFieldsets"
import OnDebtFieldset from "@/components/FormRegister/AccountsFieldsets/OnDebtFieldset";
import AmountFieldset from "@/components/FormRegister/AmountFieldset"
import DescriptionFieldset from "@/components/FormRegister/DescriptionFieldset"
import SubmitButton from "@/components/FormRegister/SubmitButton"

import {createNewTransaction} from "@/app/lib/action"

interface FormRegisterProps {
    activeRegisterOption: string
    accounts: UserAccount[],
    incomesCategories: BudgetItem[],
    expensesCategories: BudgetItem[],
    // debts: Debt[],
    // saves: Save[],
    // creditCards: CreditCard[],
}

const FormRegister: React.FC<FormRegisterProps> = ({
    activeRegisterOption,
    accounts,
    incomesCategories,
    expensesCategories,
    // debts,
    // saves,
    // creditCards,
}) => {

    // Transforming the activeRegisterOption to the type of register that the server expects in english

    console.log('activeRegisterOption', activeRegisterOption)


    const[currentTransaction, setCurrentTransaction] = React.useState<Transaction>({
        type: activeRegisterOption,
        date: new Date(),
        accountFrom: '',
        accountFromId: '',
        accountTo: '',
        accountToId: '',
        amount: 0,
        description: '',
    })

    // console.log('currentTransaction', currentTransaction)

    // La animación de ponerlo y quitarlo debe ser hecha con css 
    // El problema es que necesito confirmación de que la transacción se hizo correctamente y con base a eso mostrar un mensaje u otro
    // Enviarla desde el server es la unica opción, evidentemente, y necesito consumirla en este formulario para hacer validaciones

    const [confirmationMessage, setConfirmationMessage] = React.useState({
        show: false,
        isSuccessful: false,
        message: ''
    })

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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await fetch('/api/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(currentTransaction),
        });

        if (response.ok) {
            const data = await response.json();
            setConfirmationMessage({
                show: true,
                isSuccessful: true,
                message: data,
            });
        } else {
            setConfirmationMessage({
                show: true,
                isSuccessful: false,
                message: 'Hubo un problema al registrar la transacción, intenta de nuevo',
            });
        }

        setCurrentTransaction({
            type: currentTransaction.type,
            date: new Date(),
            accountFrom: '',
            accountFromId: '',
            accountTo: '',
            accountToId: '',
            amount: 0,
            description: '',
        });
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="border py-4 p-2 border-white rounded-md">
                <FieldsetTypeOfRegister
                    currentTransaction={currentTransaction}
                    setCurrentTransaction={setCurrentTransaction}
                />
                <FieldSetDate
                    currentTransaction={currentTransaction}
                    setCurrentTransaction={setCurrentTransaction}
                />
                <AccountsFieldset
                    typeOfRegister={currentTransaction.type}
                    onIncome={() => 
                        <OnIncomeFieldsets 
                            incomesCategories={incomesCategories}
                            accounts={accounts}
                            currentTransaction={currentTransaction}
                            setCurrentTransaction={setCurrentTransaction}
                        />}
                    onExpense={() => 
                        <OnExpenseFieldsets 
                            expensesCategories={expensesCategories}
                            userAccounts={accounts}
                            currentTransaction={currentTransaction}
                            setCurrentTransaction={setCurrentTransaction}
                        />}   
                    onMovement={() => 
                        <OnMovementFieldsets 
                            userAccounts={accounts}
                            currentTransaction={currentTransaction}
                            setCurrentTransaction={setCurrentTransaction}
                        />}                    
                    // onDebt={() =>
                    //     <OnDebtFieldset
                    //         userAccounts={accounts}
                    //         currentTransaction={currentTransaction}
                    //         setCurrentTransaction={setCurrentTransaction}
                    //         userDebts={debts}
                    //     />}
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



