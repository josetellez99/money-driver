'use client'

import React, { ChangeEvent } from "react"

import ElementTitle from "@/components/ElementTitle"
import TitleFieldset from "@/components/FormRegister/TitleFieldset"
import AmountFieldset from "@/components/FormRegister/AmountFieldset"
import SubmitButton from "@/components/FormRegister/SubmitButton"
import ActionButton from "@/components/ActionButton"
import { useRouter } from 'next/navigation'

import { updateUserAccount } from "@/app/lib/action"


interface EditFormProps {
    incomeCategories: BudgetItem[];
    userAccounts: UserAccount[];
    currentAccountID: string;
}

const EditForm: React.FC<EditFormProps> = ({
    incomeCategories,
    userAccounts,
    currentAccountID
}) => {

    const router = useRouter()

    // In this Form you can create, edit or delete an account. In all cases you need to create a transaction to adjust the amounts of the involved accounts
    // This state is to save the information of the transaction to adjust the amount of the accounts
    const[adjustmentTransferInfo, setAdjustmentTransferInfo] = React.useState<Transaction>({
        type: '',
        date: new Date(),
        accountFrom: '',
        accountTo: '',
        amount: 0,
        description: '',
    });

    console.log("adjustmentTransferInfo", adjustmentTransferInfo);

    const[currentAccount, setCurrentAccount] = React.useState<UserAccount>(userAccounts.find((account) => account.id === currentAccountID));

    // This state hold the difference between the currentAccount.amount old value and the currentAccount.amount new value
    // When the user change the currentAccount.amount this state is updated
    const[difference, setDifference] = React.useState<number>(0);

    // This state hold the initial value of the currentAccount, when currentAccount.amount change this state reamins the same
    // We never update this state, we only use it to compare the old value of the currentAccount.amount
    const[currentAccountOldValue, setCurrentAccountOldValue] = React.useState<number>(currentAccount.amount);

    const deteleAccountRedirect = () => {
        router.push(`/presupuesto-cuentas/delete-account/${currentAccountID}`, { scroll: false })
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

        setDifference(value - currentAccountOldValue)  
    }

    React.useEffect(() => {

        console.log(difference)
        // Difference is a negative number
        if(difference < 0) {
            setAdjustmentTransferInfo({
                ...adjustmentTransferInfo,
                type: 'expense',
                accountFrom: currentAccount?.title,
                amount: Math.abs(difference), // converting the negative number to positive
                description: `Ajuste de cuenta negativo a: ${currentAccount?.title}`,
            })
        }
        // Difference is a positive number
        if(difference > 0) {
            setAdjustmentTransferInfo({
                ...adjustmentTransferInfo,
                type: 'income',
                accountTo: currentAccount?.title,
                amount: difference,
                description: `Ajuste de cuenta positivo a: ${currentAccount?.title}`,
            })
        }
    }, [difference])

    return (
        <>
            <form action={() => updateUserAccount(currentAccount, adjustmentTransferInfo)} >
                    <ElementTitle 
                        title={'Editar cuenta'} />
                    <div className="my-8" />
                    <TitleFieldset
                        title={currentAccount?.title}
                        onChange={titleAccountHandleOnChange}
                    />
                    <AmountFieldset
                        amount={currentAccount?.amount}
                        onChange={amountAccountHandleOnChange}
                    />
                    { difference !== 0 && (

                        // When difference is not "0" is because of the user changing the currentAccount.amount in the AmountFieldset component
                        
                            <SectionEditAccount
                                difference={difference}
                                currentAccount={currentAccount}
                                currentAccountOldValue={currentAccountOldValue}
                                incomeCategories={incomeCategories}
                                adjustmentTransferInfo={adjustmentTransferInfo}
                                setAdjustmentTransferInfo={setAdjustmentTransferInfo}
                            />
                        
                    )}
                    <SubmitButton title='Guardar' />
                    <ActionButton 
                        title='Eliminar esta cuenta'
                        type='delete'
                        onClick={deteleAccountRedirect}
                    />
            </form>
        </>
    )
}
export default EditForm


import formatMoney from '@/utils/formatMoney';
import AccountsFieldsets from '@/components/FormRegister/AccountsFieldsets';
import UserAccountButton from '@/components/FormRegister/UserAccountButton';
import HighLightedContainer from '@/components/HighLightedContainer';

interface SectionEditAccountProps {
    difference: number;
    currentAccount: UserAccount;
    currentAccountOldValue: number;
    incomeCategories: BudgetItem[];
    adjustmentTransferInfo: Transaction;
    setAdjustmentTransferInfo: (value: any) => void;
}

const SectionEditAccount: React.FC<SectionEditAccountProps> = ({
    difference,
    currentAccount,
    currentAccountOldValue,
    incomeCategories,
    adjustmentTransferInfo,
    setAdjustmentTransferInfo,

}) => {

    const setAccountFromTrasnferInfo = (item: BudgetItem | UserAccount) => {
        setAdjustmentTransferInfo({
            ...adjustmentTransferInfo,
            accountFrom: item.title,
        })
    }

    return (
        <>
            <div className="mb-4">
                <p className="text-sm">
                    <span>{`Antiguo valor `}</span> 
                    <span className="text-greenYellow font-bold">{formatMoney(currentAccountOldValue)}</span>
                </p>
                <p className="text-sm">
                    <span>{`La diferencia es `}</span>
                    <span className="text-greenYellow font-bold">{formatMoney(difference)}</span>
                </p>
            </div>
                { difference > 0 && (
                    <>
                        <p className="mb-4">{`¿De donde viene la cantidad extra de ${formatMoney(difference)}?`}</p>
                        <AccountsFieldsets>
                            { incomeCategories.map( income => {
                                    return (
                                        <UserAccountButton
                                            buttonData={income}
                                            onClick={() => setAccountFromTrasnferInfo(income)}
                                            isActive={income.title === adjustmentTransferInfo?.accountFrom}
                                        />
                                    )
                                })}
                            <UserAccountButton
                                buttonData={{id: 'ajuste-de-cuenta', title: 'Ajuste de cuenta', amount: undefined!}}
                                onClick={() => {
                                    setAdjustmentTransferInfo({
                                        ...adjustmentTransferInfo,
                                        accountFrom: 'Ajuste de cuenta',
                                    })
                                }}
                                isActive={adjustmentTransferInfo?.accountFrom === 'Ajuste de cuenta'}
                            />
                        </AccountsFieldsets>
                            <HighLightedContainer>
                            <p className="text-black p-1 text-justify">
                                {`Se cambiará el valor de la cuenta `}
                                <span className="font-bold">{currentAccount?.title}</span>
                                {` y se registrará un ingreso desde `}
                                <span className="font-bold">{adjustmentTransferInfo?.accountFrom}</span>
                                {` por valor de `}
                                <span className="font-bold">{formatMoney(adjustmentTransferInfo?.amount)}</span>
                                {`. Para continuar, pulsa `}
                                <span className="font-bold">"Guardar"</span>
                            </p>
                        </HighLightedContainer>
                    </>
                )}
                { difference < 0 && (
                    <>
                        <p className="mb-4">{`¿A dónde va la cantidad extra de ${formatMoney(difference)}?`}</p>
                        <AccountsFieldsets>
                            <UserAccountButton
                                buttonData={{id: 'ajuste-de-cuenta', title: 'Ajuste de cuenta', amount: undefined!}}
                                onClick={() => {
                                    setAdjustmentTransferInfo({
                                        ...adjustmentTransferInfo,
                                        accountTo: 'Ajuste de cuenta',
                                    })
                                }}
                                isActive={adjustmentTransferInfo?.accountTo === 'Ajuste de cuenta'}
                            />
                        </AccountsFieldsets>
                            <HighLightedContainer>
                            <p className="text-black p-1 text-justify">
                                {`Se cambiará el valor de la cuenta `}
                                <span className="font-bold">{currentAccount?.title}</span>
                                {` y se registrará un egreso hacia `}
                                <span className="font-bold">{adjustmentTransferInfo?.accountTo}</span>
                                {` por valor de `}
                                <span className="font-bold">{formatMoney(adjustmentTransferInfo?.amount)}</span>
                                {`. Para continuar, pulsa `}
                                <span className="font-bold">"Guardar"</span>
                            </p>
                        </HighLightedContainer>
                    </>
                )}
            </>
    )
};