import React, { ReactNode } from "react"

interface AccountsFieldsetsProps {
    children: ReactNode
}

const AccountsFieldsets: React.FC<AccountsFieldsetsProps> = ({children}) => {

    return (
        <>
            <section className="grid grid-cols-3 gap-3 mb-6">
                {children}
            </section>
        </>
    )
}

export default AccountsFieldsets