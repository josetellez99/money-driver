import React from "react";

import UserAccountButton from "@/components/FormRegister/UserAccountButton"
import AccountsFieldsets from "@/components/FormRegister/AccountsFieldsets";
import FieldsetTitle from "@/components/FormRegister/FieldsetTitle";

interface OnMovementFieldsetsProps {
    userAccounts: UserAccount[],
    accountFrom: string | undefined,
    setAccountFrom: React.Dispatch<React.SetStateAction<string | undefined>>,
    accountTo: string | undefined,
    setAccountTo: React.Dispatch<React.SetStateAction<string | undefined>>

}

const OnMovementFieldsets: React.FC<OnMovementFieldsetsProps> = ({ 
        userAccounts, 
        accountFrom, 
        setAccountFrom, 
        accountTo, 
        setAccountTo
    }) => {
    
    return (
        <>
            <AccountsFieldsets>
                <FieldsetTitle title='¿De donde salió el dinero?' />
                {userAccounts.map( (item: ButtonData) => (
                    <UserAccountButton
                        key={item.id}
                        buttonsData={item}
                        isActive={accountFrom === item.title}
                        setAccount={setAccountFrom}
                    />
                ))}
            </AccountsFieldsets>
            <AccountsFieldsets>
                <FieldsetTitle title='¿A que cuenta entró el dinero?' />
                {userAccounts.map( (item: ButtonData) => (
                    <UserAccountButton
                        key={(item.id + 1000000)} // 100 are add to make difference that key prop from the key in the upper fieldset
                        buttonsData={item}
                        isActive={accountTo === item.title}
                        setAccount={setAccountTo}
                    />
                ))}
            </AccountsFieldsets>
        </>
    )
}

export default OnMovementFieldsets