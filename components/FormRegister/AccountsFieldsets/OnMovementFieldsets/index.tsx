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
            <FieldsetTitle title='¿De donde salió el dinero?' />
            <AccountsFieldsets>
                {userAccounts.map( (account: ButtonData) => (
                    <UserAccountButton
                        key={account.id}
                        buttonData={account}
                        isActive={currentTransaction.accountFrom === account.title}
                        onClick={() => onClickAccountFrom(account.title)}
                        accountType={'accountFrom'}
                    />
                ))}
            </AccountsFieldsets>
            <FieldsetTitle title='¿A que cuenta entró el dinero?' />
            <AccountsFieldsets>
                {userAccounts.map( (accountTo: ButtonData) => (
                    <UserAccountButton
                        key={(accountTo.id + 100000)} // 100 are add to make difference that key prop from the key in the upper fieldset
                        buttonData={accountTo}
                        isActive={currentTransaction.accountTo === accountTo.title}
                        onClick={() => onClickAccountTo(accountTo.title)}
                        accountType={'accountTo'}
                    />
                ))}
            </AccountsFieldsets>
        </>
    )
}

export default OnMovementFieldsets