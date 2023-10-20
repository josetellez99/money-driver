import React, { ReactNode } from "react"

interface AccountsFieldsetsProps {
    children: ReactNode
}

const AccountsFieldsets: React.FC<AccountsFieldsetsProps> = ({children}) => {

    return (
        <>
            <fieldset className="grid grid-cols-4 w-full gap-1 mb-6">
                {children}
            </fieldset>
        </>
    )
}

export default AccountsFieldsets