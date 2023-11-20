import React from "react";

import UserAccountButton from "@/components/FormRegister/UserAccountButton"
import AccountsFieldsets from "@/components/FormRegister/AccountsFieldsets";
import FieldsetTitle from "@/components/FormRegister/FieldsetTitle";

interface OnMovementFieldsetsProps {
    userAccounts: UserAccount[],
    currentTransaction: Transaction,
    setCurrentTransaction: React.Dispatch<React.SetStateAction<Transaction>>
}

const OnMovementFieldsets: React.FC<OnMovementFieldsetsProps> = ({ 
        userAccounts, 
        currentTransaction,
        setCurrentTransaction
    }) => {

        const onClickAccountFrom = (accountFrom: string, accountFromId: string) => {
            setCurrentTransaction({
                ...currentTransaction,
                accountFrom: accountFrom,
                accountFromId: accountFromId
            })
        }

        const onClickAccountTo = (accountTo: string, accountToId: string) => {
            setCurrentTransaction({
                ...currentTransaction,
                accountTo: accountTo,
                accountToId: accountToId
            })
        }
    
    return (
        <>
            <FieldsetTitle title='¿De donde salió el dinero?' />
            <AccountsFieldsets>
                {userAccounts.map( (account) => (
                    <UserAccountButton
                        key={account.id}
                        buttonData={account}
                        isActive={currentTransaction.accountFrom === account.title}
                        onClick={() => onClickAccountFrom(account.title, account.id!)}
                        accountType={'accountFrom'}
                    />
                ))}
            </AccountsFieldsets>
            <FieldsetTitle title='¿A que cuenta entró el dinero?' />
            <AccountsFieldsets>
                {userAccounts.map( (accountTo) => (
                    <UserAccountButton
                        key={(accountTo.id! + 100)} // 100 are add to make difference that key prop from the key in the upper fieldset
                        buttonData={accountTo}
                        isActive={currentTransaction.accountTo === accountTo.title}
                        onClick={() => onClickAccountTo(accountTo.title, accountTo.id!)}
                        accountType={'accountTo'}
                    />
                ))}
            </AccountsFieldsets>
        </>
    )
}

export default OnMovementFieldsets