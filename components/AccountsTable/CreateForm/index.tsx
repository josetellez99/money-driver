'use client'

import React, { ChangeEvent } from "react"

import MainDefault from "@/components/MainDefault"

import ElementTitle from "@/components/ElementTitle"
import TitleFieldset from "@/components/FormRegister/TitleFieldset"
import AmountFieldset from "@/components/FormRegister/AmountFieldset"
import SubmitButton from "@/components/FormRegister/SubmitButton"
import ActionButton from "@/components/ActionButton"

import SectionDeleteAccount from "@/components/AccountsTable/AccountModal/SectionDeleteAccount"
import SectionCreateAccount from "@/components/AccountsTable/AccountModal/SectionCreateAccount"
import SectionEditAccount from "@/components/AccountsTable/AccountModal/SectionEditAccount"

import BackButton from "@/components/BackButton"
import { useDebouncedCallback } from 'use-debounce';


import { usePathname } from "next/navigation"

interface AccountModalProps {
    incomeCategories: BudgetItem[];
    userAccounts: UserAccount[];
    currentAccountID: string;
}

const AccountModal: React.FC<AccountModalProps> = ({
    incomeCategories,
    userAccounts,
    currentAccountID
}) => {

    // In this modal you can create, edit or delete an account. In all cases you need to create a transaction to adjust the amounts of the involved accounts
    // This state is to save the information of the transaction to adjust the amount of the accounts
    const[adjustmentTransferInfo, setAdjustmentTransferInfo] = React.useState<Transaction>({
        type: undefined,
        date: new Date(),
        accountFrom: undefined,
        accountTo: undefined,
        amount: undefined,
        description: undefined,
    });

    const[currentAccount, setCurrentAccount] = React.useState<UserAccount>(userAccounts.find((account) => account.id === currentAccountID));

    const pathname = usePathname()
    const isEditPath = pathname.includes('edit');

    // This state hold the type of the action to be executed, create, edit or delete
    const[actionType, setActionType] = React.useState<'create' | 'edit' | 'delete'>(isEditPath ? 'edit' : 'create');

    // This state hold the difference between the old value of the currentAccount.amount and the new value of the currentAccount.amount
    // Is useful for the 'edi' case to make comparisons and validations
    const[difference, setDifference] = React.useState<number>(0);

    // This state hold the initial value of the currentAccount, when currentAccount.amount change this state reamins the same
    // We never update this state, we only use it to compare the old value of the currentAccount.amount
    const[currentAccountOldValue, setCurrentAccountOldValue] = React.useState<number>(currentAccount.amount);


    

    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    const createNewTransaction = (transactionInfo: Transaction) => {
        // Here is the logic to create the transaction to adjust the edit, create or deleted account
    }


    const deleteAccountHandleClick = () => {

    }

    const titleAccountHandleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target
        setCurrentAccount({...currentAccount, title: value});
    }

    const amountAccountHandleOnChange = (value: number) => {
        setCurrentAccount({...currentAccount, amount: value});
        setAdjustmentTransferInfo({
            ...adjustmentTransferInfo,
            amount: value,
        })
        if(actionType === 'edit') {
            setDifference(value - currentAccountOldValue)
            
            if(value < currentAccountOldValue) {
                setAdjustmentTransferInfo({
                    ...adjustmentTransferInfo,
                    type: 'expense',
                    accountFrom: currentAccount?.title,
                    accountTo: 'Ajuste de cuenta',
                    amount: Math.abs(value - currentAccountOldValue), // converting the negative number to positive
                    description: `Ajuste de cuenta negativo a: ${currentAccount?.title}`,
                })
            } else if (value > currentAccountOldValue) {
                setAdjustmentTransferInfo({
                    ...adjustmentTransferInfo,
                    type: 'income',
                    accountFrom: 'Ajuste de cuenta',
                    accountTo: currentAccount?.title,
                    amount: value - currentAccountOldValue,
                    description: `Ajuste de cuenta positivo a: ${currentAccount?.title}`,
                })
            }
        }      
    }

    return (
        <>
        <MainDefault>
            <div className="flex flex-col w-full">
                <BackButton href='/presupuesto-cuentas' />
                <form action="" onSubmit={handleSubmit}>
                        <ElementTitle 
                            title={actionType === 'create' ? 'Crear cuenta' : 'Editar cuenta'} />
                        <div className="my-8" />
                        <TitleFieldset
                            title={currentAccount?.title}
                            onChange={titleAccountHandleOnChange}
                        />
                        { (actionType === 'create' || actionType === 'edit') &&
                            <AmountFieldset
                                amount={currentAccount?.amount}
                                onChange={amountAccountHandleOnChange}
                            />
                        }
                        { actionType === 'edit' && ( 
                            <ActionButton 
                            title='Eliminar esta cuenta'
                            type='delete'
                            onClick={deleteAccountHandleClick}
                            />
                            )}
                        { actionType === 'edit' && difference !== 0 && (

                            // When difference is not "0" is cause by the user changing the currentAccount.amount
                            <>
                                <SectionEditAccount
                                    difference={difference}
                                    currentAccount={currentAccount!}
                                    currentAccountOldValue={currentAccountOldValue}
                                    incomeCategories={incomeCategories}
                                    adjustmentTransferInfo={adjustmentTransferInfo}
                                    setAdjustmentTransferInfo={setAdjustmentTransferInfo}

                                />
                            </>
                        )}
                        { actionType === 'delete' && (
                            <>
                                <SectionDeleteAccount
                                    currentAccount={currentAccount}
                                    accounts={userAccounts}
                                    adjustmentTransferInfo={adjustmentTransferInfo}
                                    setAdjustmentTransferInfo={setAdjustmentTransferInfo}
                                    setActionType={setActionType}
                                />
                            </>
                        )}
                        { actionType === 'create' &&  (
                            <>
                                <SectionCreateAccount 
                                    currentAccount={currentAccount}
                                    incomeCategories={incomeCategories}
                                    accounts={userAccounts}
                                    adjustmentTransferInfo={adjustmentTransferInfo}
                                    setAdjustmentTransferInfo={setAdjustmentTransferInfo}
                                />
                            </>
                        )}
                        <SubmitButton title='Guardar' />
                </form>
            </div>
        </MainDefault>
        </>
    )
}
export default AccountModal