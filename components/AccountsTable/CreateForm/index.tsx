'use client'

import React, { ChangeEvent } from "react"

import ElementTitle from "@/components/ElementTitle"
import TitleFieldset from "@/components/FormRegister/TitleFieldset"
import AmountFieldset from "@/components/FormRegister/AmountFieldset"
import SubmitButton from "@/components/FormRegister/SubmitButton"

import { createUserAccount } from "@/app/lib/action"

interface CreateFormProps {
    userAccounts: UserAccount[];
    incomeCategories: BudgetItem[];
}


// Okey con la estrategia de cookies no se pudo porque estamos hablando de un componente del lado del servidor, ahora vamos con la estrategia de la url

const CreateForm: React.FC<CreateFormProps> = ({
    userAccounts,
    incomeCategories,
}) => {

    // In this modal you can create an account. You need to create a transaction to adjust the amounts of the involved accounts
    // This state is to save the information of the transaction to adjust the amount of the accounts
    const[adjustmentTransferInfo, setAdjustmentTransferInfo] = React.useState<Transaction>({
        type: '',
        date: new Date(),
        accountFrom: '',
        accountFromId: '',
        accountTo: '',
        accountToId: '',
        amount: 0,
        description: '',
    });

    const[newAccount, setNewAccount] = React.useState<UserAccount>({
        title: '',
        amount: 0,
    });

    const titleAccountHandleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target
        setNewAccount({...newAccount, title: value});
        setAdjustmentTransferInfo({
            ...adjustmentTransferInfo,
            accountTo: value,
        })
    }

    const amountAccountHandleOnChange = (value: number) => {
        setNewAccount({...newAccount, amount: value});
        setAdjustmentTransferInfo({
            ...adjustmentTransferInfo,
            amount: value,
        })    
    }

    const accountFrom = userAccounts.find( account => account.title === adjustmentTransferInfo.accountFrom)

    return (
        <>
            <form action={() => createUserAccount(newAccount, adjustmentTransferInfo, accountFrom?.id!)}>
                    <ElementTitle 
                        title={'Crear nueva cuenta'} />
                    <div className="my-8" />
                    <TitleFieldset
                        title={newAccount?.title}
                        onChange={titleAccountHandleOnChange}
                    />
                    <AmountFieldset
                        amount={newAccount?.amount}
                        onChange={amountAccountHandleOnChange}
                    />
                    
                        <>
                            <SectionCreateAccount 
                                newAccount={newAccount}
                                incomeCategories={incomeCategories}
                                accounts={userAccounts}
                                adjustmentTransferInfo={adjustmentTransferInfo}
                                setAdjustmentTransferInfo={setAdjustmentTransferInfo}
                            />
                        </>
                    <SubmitButton title='Guardar' />
            </form>
        </>
    )
}


export default CreateForm

import AccountsFieldsets from '@/components/FormRegister/AccountsFieldsets';
import UserAccountButton from '@/components/FormRegister/UserAccountButton';
import RegularButtonList from '@/components/RegularButtonList';
import RegularButton from '@/components/RegularButton';
import HighLightedContainer from '@/components/HighLightedContainer';
import formatMoney from '@/utils/formatMoney';

interface SectionCreateAccountProps {
    newAccount: UserAccount | undefined
    accounts: UserAccount[]
    incomeCategories: BudgetItem[],
    adjustmentTransferInfo: Transaction,
    setAdjustmentTransferInfo: React.Dispatch<React.SetStateAction<Transaction>>
}

const SectionCreateAccount: React.FC<SectionCreateAccountProps> = ({
    accounts,
    incomeCategories,
    newAccount,
    adjustmentTransferInfo,
    setAdjustmentTransferInfo,

    }) => {

    const[showHighLigtedMessage, setShowHighLigtedMessage] = React.useState<boolean>(false)
    const[whereMoneyCameFrom, setWhereMoneyCameFrom] = React.useState<string | undefined>(undefined)

    const moneyFromOptions = [
        {
            title: 'Otra cuenta',
            id: 1
        },
        {
            title: 'Es un ingreso',
            id: 2
        }
    ]

    const setTransferInfoAccountFrom = (item: BudgetItem | UserAccount, type: string) => {
        setAdjustmentTransferInfo({
            ...adjustmentTransferInfo,
            type: type,
            accountFrom: item.title,
            accountFromId: item.id!,
            description: `Creacion de la cuenta ${newAccount?.title}, el dinero vino desde ${item.title}`,
        })
        setShowHighLigtedMessage(true);
    }



    return (
        <>
            <div className="mb-4">
                <p className="mb-2">¿De donde viene el dinero de esta cuenta nueva?</p>
                <RegularButtonList
                    className="flex gap-2"
                    >
                    {moneyFromOptions.map( option => {
                        return (
                            <RegularButton
                                buttonData={option}
                                onClick={() => setWhereMoneyCameFrom(option.title)}
                                isActive={option.title === whereMoneyCameFrom}
                            />
                            )
                        })}
                </RegularButtonList>
            </div>

                { whereMoneyCameFrom === 'Otra cuenta' && (
                    <>
                        <p className="mb-2">¿De qué cuenta viene el dinero?</p>
                        <AccountsFieldsets>
                            {accounts.map( account => {
                                return (
                                    <UserAccountButton
                                        buttonData={account}
                                        onClick={() => setTransferInfoAccountFrom(account, 'movement')}
                                        isActive={account.title === adjustmentTransferInfo?.accountFrom}
                                    />
                                )
                            })}
                        </AccountsFieldsets>
                    </>
                )}

                { whereMoneyCameFrom === 'Es un ingreso' && (
                    <>
                        <p className="mb-2">¿De qué ingreso viene el dinero?</p>
                        <AccountsFieldsets>
                            {incomeCategories.map( income => {
                                return (
                                    <UserAccountButton
                                        buttonData={income}
                                        onClick={() => setTransferInfoAccountFrom(income, 'income')}
                                        isActive={income.title === adjustmentTransferInfo?.accountFrom}
                                    />
                                    )
                                })}
                        </AccountsFieldsets>
                    </>
                )}    
        { showHighLigtedMessage && (
            <HighLightedContainer>
                <p className="text-black p-1 text-justify">
                    {`Se creará la cuenta `}
                    <span className="font-bold">{newAccount?.title}</span>
                    {` y se registrará un movimiento desde `}
                    <span className="font-bold">{adjustmentTransferInfo?.accountFrom}</span>
                    {` por valor de `}
                    <span className="font-bold">{formatMoney(adjustmentTransferInfo?.amount)}</span>
                    {`. Para continuar, pulsa `}
                    <span className="font-bold">"Guardar"</span>
                </p>
            </HighLightedContainer>
        )}
        </>
    );
}