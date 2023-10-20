import React from "react";

import UserAccountButton from "@/components/FormRegister/UserAccountButton"
import AccountsFieldsets from "@/components/FormRegister/AccountsFieldsets";
import FieldsetTitle from "@/components/FormRegister/FieldsetTitle";

interface OnIncomeFieldsetsProps {
    userAccounts: UserAccount[],
    incomesCategories: UserAccount[],
    accountFrom: string | undefined,
    setAccountFrom: React.Dispatch<React.SetStateAction<string | undefined>>,
    accountTo: string | undefined,
    setAccountTo: React.Dispatch<React.SetStateAction<string | undefined>>

}

const OnIncomeFieldsets: React.FC<OnIncomeFieldsetsProps> = ({ 
        userAccounts, 
        incomesCategories, 
        accountFrom, 
        setAccountFrom, 
        accountTo, 
        setAccountTo
    }) => {
    
    return (
        <>
            <AccountsFieldsets>
                <FieldsetTitle title='¿De dónde viene este ingreso?' />
                {incomesCategories.map( (item: ButtonData) => (
                    <UserAccountButton
                        key={item.id}
                        buttonsData={item}
                        isActive={accountFrom === item.title}
                        setAccount={setAccountFrom}
                    />
                ))}
            </AccountsFieldsets>
            <AccountsFieldsets>
                <FieldsetTitle title='¿A qué cuenta ingresó el dinero?' />
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

export default OnIncomeFieldsets