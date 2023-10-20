import React from "react";

import UserAccountButton from "@/components/FormRegister/UserAccountButton"
import AccountsFieldsets from "@/components/FormRegister/AccountsFieldsets";
import FieldsetTitle from "@/components/FormRegister/FieldsetTitle";

interface OnExpenseFieldsetsProps {
    userAccounts: UserAccount[],
    expensesCategories: UserAccount[],
    accountFrom: string | undefined,
    setAccountFrom: React.Dispatch<React.SetStateAction<string | undefined>>,
    accountTo: string | undefined,
    setAccountTo: React.Dispatch<React.SetStateAction<string | undefined>>

}

const OnExpenseFieldsets: React.FC<OnExpenseFieldsetsProps> = ({ 
        userAccounts, 
        expensesCategories, 
        accountFrom, 
        setAccountFrom, 
        accountTo, 
        setAccountTo
    }) => {
    
    return (
        <>
            <AccountsFieldsets>
                <FieldsetTitle title='¿En qué categoria gastaste?' />
                {expensesCategories.map( (item: ButtonData) => (
                    <UserAccountButton
                        key={item.id}
                        buttonsData={item}
                        isActive={accountFrom === item.title}
                        setAccount={setAccountFrom}
                    />
                ))}
            </AccountsFieldsets>
            <AccountsFieldsets>
                <FieldsetTitle title='¿De donde salió el dinero?' />
                {userAccounts.map( (item: ButtonData) => (
                    <UserAccountButton
                        key={item.id}
                        buttonsData={item}
                        isActive={accountTo === item.title}
                        setAccount={setAccountTo}
                    />
                ))}
            </AccountsFieldsets>
        </>
    )
}

export default OnExpenseFieldsets