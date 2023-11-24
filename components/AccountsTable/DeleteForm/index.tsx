'use client'

import React from "react"

import ElementTitle from "@/components/ElementTitle"
import TitleFieldset from "@/components/FormRegister/TitleFieldset"
import AmountFieldset from "@/components/FormRegister/AmountFieldset"
import SubmitButton from "@/components/FormRegister/SubmitButton"

import { deleteUserAccount } from "@/app/lib/action"


interface DeleteFormProps {
    userAccount : UserAccount,
    userAccounts: UserAccount[],
}

const DeleteForm: React.FC<DeleteFormProps> = ({
    userAccount,
    userAccounts,
}) => {

    // In this Form you can create, edit or delete an account. In all cases you need to create a transaction to adjust the amounts of the involved accounts
    // This state is to save the information of the transaction to adjust the amount of the accounts
    const[adjustmentTransferInfo, setAdjustmentTransferInfo] = React.useState<Transaction>({
        type: 'movement',
        date: new Date(),
        accountFrom: userAccount.title,
        accountFromId: userAccount.id!,
        accountTo: '',
        accountToId: '',
        amount: 0,
        description: '',
    });

    const accountTo = userAccounts.find( account => account.title === adjustmentTransferInfo.accountTo)

    return (
        <>
            <form action={() => deleteUserAccount(adjustmentTransferInfo, accountTo?.id!)} >
                    <ElementTitle 
                        title={'Eliminar cuenta'} />
                    <div className="my-8" />
                    <TitleFieldset
                        title={userAccount.title}
                        readOnly={true}
                    />
                    <AmountFieldset
                        amount={userAccount.amount}
                        readOnly={true}
                    />
                    <SectionDeleteAccount 
                        userAccount={userAccount}
                        userAccounts={userAccounts}
                        adjustmentTransferInfo={adjustmentTransferInfo}
                        setAdjustmentTransferInfo={setAdjustmentTransferInfo}
                    />
                    <SubmitButton title='Guardar' />
            </form>
        </>
    )
}
export default DeleteForm




import AccountsFieldsets from '@/components/FormRegister/AccountsFieldsets'
import UserAccountButton from '@/components/FormRegister/UserAccountButton'
import HighLightedContainer from '@/components/HighLightedContainer'
import formatMoney from '@/utils/formatMoney'

interface SectionDeleteAccountProps {
    userAccount: UserAccount;
    userAccounts: UserAccount[];
    adjustmentTransferInfo: Transaction,
    setAdjustmentTransferInfo: React.Dispatch<React.SetStateAction<Transaction>>
}

const SectionDeleteAccount: React.FC<SectionDeleteAccountProps> = ({
    userAccount,
    userAccounts,
    adjustmentTransferInfo,
    setAdjustmentTransferInfo,
}) => {

    const[showHighLigtedMessage, setShowHighLigtedMessage] = React.useState<boolean>(true)

    const setAccountToForAdjusmentTransfer = (accountToName: string, accountToId: string) => {
        setAdjustmentTransferInfo({
            ...adjustmentTransferInfo,
            accountTo: accountToName,
            accountToId: accountToId,
            amount: userAccount.amount!,
            description: `Ajuste de cuenta desde ${userAccount.title}, hacia ${accountToName}`,
        })
        setShowHighLigtedMessage(true);
    }


    return (
        <>
            <p className="my-4 text-justify">
                {`¿A qué cuenta quieres mover el dinero de la cuenta"`}
                <span className="font-bold text-greenYellow">{userAccount.title}</span>
                <span>{`" ?`}</span>
            </p>
            <AccountsFieldsets>
                {userAccounts.map( account => {
                    if(account.title === userAccount.title) return null
                    return (
                        <UserAccountButton
                            buttonData={account}
                            onClick={() => setAccountToForAdjusmentTransfer(account.title, account.id!)}
                            isActive={account.title === adjustmentTransferInfo?.accountTo}
                        />
                    )
                })}
                <UserAccountButton
                    buttonData={{id: 'ajuste-de-cuenta', title: 'Ajuste de cuenta', amount: 0}}
                    onClick={() => setAccountToForAdjusmentTransfer('Ajuste de cuenta', 'ajuste-de-cuenta')}
                    isActive={adjustmentTransferInfo?.accountTo === 'Ajuste de cuenta'}
                />
            </AccountsFieldsets>
            { showHighLigtedMessage && (
                <HighLightedContainer>
                    <p className="text-black p-1 text-justify">
                        {`Se eliminará la cuenta `}
                        <span className="font-bold">{userAccount.title}</span>
                        {` y se asumirá como una perdida. Registraremos un movimiento hacia `}
                        <span className="font-bold">{adjustmentTransferInfo?.accountTo}</span>
                        {` por valor de `}
                        <span className="font-bold">{formatMoney(adjustmentTransferInfo?.amount)}</span>
                        {`. Para continuar, pulsa `}
                        <span className="font-bold">"Guardar"</span>
                    </p>
                </HighLightedContainer>
            )}
        </>
    )
}