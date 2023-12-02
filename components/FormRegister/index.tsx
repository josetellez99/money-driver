'use client'

import React from "react"

import FieldsetTypeOfRegister from "@/components/FormRegister/FieldsetTypeOfRegister"
import FieldSetDate from "@/components/FormRegister/FieldSetDate"
import AccountsFieldset from "@/components/FormRegister/AccountsFieldset"
import OnIncomeFieldsets from "@/components/FormRegister/AccountsFieldsets/OnIncomeFieldsets"
import OnExpenseFieldsets from "@/components/FormRegister/AccountsFieldsets/OnExpensesFieldsets"
import OnMovementFieldsets from "@/components/FormRegister/AccountsFieldsets/OnMovementFieldsets"
import OnDebtFieldset from "@/components/FormRegister/AccountsFieldsets/OnDebtFieldset";
import OnSaveFieldset from "@/components/FormRegister/AccountsFieldsets/OnSaveFieldset";
import OnCreditCardFieldset from "@/components/FormRegister/AccountsFieldsets/OnCreditCardFieldset";

import AmountFieldset from "@/components/FormRegister/AmountFieldset"
import DescriptionFieldset from "@/components/FormRegister/DescriptionFieldset"
import SubmitButton from "@/components/FormRegister/SubmitButton"
import ConfirmationMessage from "@/components/ConfirmationMessage"

import Summarytransaction from "@/components/SummaryTransaction"
import SummaryTransactionList from "@/components/SummaryTransactionList"

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

    const [confirmationMessage, setConfirmationMessage] = React.useState({
        show: false,
        type: '',
        message: ''
    })

    const [createdTransactions, setCreatedTransactions] = React.useState<Transaction[]>([])

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

        const response = await fetch('/api/create-transaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(currentTransaction),
        });

        const {transaction} = await response.json();

        if (response.ok) {
            setConfirmationMessage({
                show: true,
                type: 'success',
                message: 'Tu transacción se ha registrado correctamente',
            });
        } else {
            setConfirmationMessage({
                show: true,
                type: 'error',
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

        setCreatedTransactions([...createdTransactions, transaction]);
    }

    return (
        <>
            {confirmationMessage.show && (
                <ConfirmationMessage 
                    message={confirmationMessage.message}
                    type={confirmationMessage.type}
                    setConfirmationMessage={setConfirmationMessage}
                />
            )}
            <form onSubmit={handleSubmit} className="border mb-4 py-4 p-2 border-white rounded-md">
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
                    onDebt={() =>
                        <OnDebtFieldset
                            // userAccounts={accounts}
                            // currentTransaction={currentTransaction}
                            // setCurrentTransaction={setCurrentTransaction}
                            // userDebts={debts}
                        />}
                    onSave={() =>
                        <OnSaveFieldset 
                        
                        />
                    }
                    onCreditCard={() =>
                        <OnCreditCardFieldset 
                        
                        />
                    }
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
            { createdTransactions.length > 0 && (
                <SummaryTransactionList
                    title="Transacciones registradas"
                    transactions={createdTransactions}
                />
            )}
        </>
    )
}

export default FormRegister



