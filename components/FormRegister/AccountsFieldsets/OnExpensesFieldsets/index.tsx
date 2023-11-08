import React from "react";

import UserAccountButton from "@/components/FormRegister/UserAccountButton"
import AccountsFieldsets from "@/components/FormRegister/AccountsFieldsets";
import FieldsetTitle from "@/components/FormRegister/FieldsetTitle";

interface OnExpenseFieldsetsProps {
    userAccounts: UserAccount[],
    expensesCategories: UserAccount[],
    currentTransaction: Transaction,
    setCurrentTransaction: React.Dispatch<React.SetStateAction<Transaction>>,
}

const OnExpenseFieldsets: React.FC<OnExpenseFieldsetsProps> = ({ 
        userAccounts, 
        expensesCategories, 
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
            <FieldsetTitle title='¿En qué categoria gastaste?' />
            <AccountsFieldsets>
                {expensesCategories.map( (expenseCategory: ButtonData) => (
                    <UserAccountButton
                        key={expenseCategory.id}
                        buttonData={expenseCategory}
                        isActive={currentTransaction.accountFrom === expenseCategory.title}
                        onClick={() => onClickAccountFrom(expenseCategory.title)}
                    />
                ))}
            </AccountsFieldsets>
            <FieldsetTitle title='¿De donde salió el dinero?' />
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

export default OnExpenseFieldsets