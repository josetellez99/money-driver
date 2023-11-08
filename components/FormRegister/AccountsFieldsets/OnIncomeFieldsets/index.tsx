import React from "react";

import UserAccountButton from "@/components/FormRegister/UserAccountButton"
import AccountsFieldsets from "@/components/FormRegister/AccountsFieldsets";
import FieldsetTitle from "@/components/FormRegister/FieldsetTitle";

interface OnIncomeFieldsetsProps {
    userAccounts: UserAccount[],
    incomesCategories: UserAccount[],
    currentTransaction: Transaction,
    setCurrentTransaction: React.Dispatch<React.SetStateAction<Transaction>>,

}

const OnIncomeFieldsets: React.FC<OnIncomeFieldsetsProps> = ({ 
        userAccounts, 
        incomesCategories, 
        currentTransaction,
        setCurrentTransaction
    }) => {

        const onClickAccountFrom = (accountFrom: string) => {
            setCurrentTransaction({
                ...currentTransaction,
                accountFrom: accountFrom
            })
        }

        const onClickAccountTo = (accountTo: string) => {
            setCurrentTransaction({
                ...currentTransaction,
                accountTo: accountTo
            })
        }
    
    return (
        <>
            <FieldsetTitle title='¿De dónde viene este ingreso?' />
            <AccountsFieldsets>
                {incomesCategories.map( (incomeCategory: ButtonData) => (
                    <UserAccountButton
                        key={incomeCategory.id}
                        buttonData={incomeCategory}
                        isActive={currentTransaction.accountFrom === incomeCategory.title}
                        onClick={() => onClickAccountFrom(incomeCategory.title)}
                    />
                ))}
            </AccountsFieldsets>

            <FieldsetTitle title='¿A qué cuenta ingresó el dinero?' />
            <AccountsFieldsets>
                {userAccounts.map( (account: ButtonData) => (
                    <UserAccountButton
                        key={account.id}
                        buttonData={account}
                        isActive={currentTransaction.accountTo === account.title}
                        onClick={() => onClickAccountTo(account.title)}
                    />
                ))}
            </AccountsFieldsets>
        </>
    )
}

export default OnIncomeFieldsets