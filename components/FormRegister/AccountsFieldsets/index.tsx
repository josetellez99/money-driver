import React, { ReactNode } from "react"

interface AccountsFieldsetsProps {
    children: ReactNode
    className?: string
}

const AccountsFieldsets: React.FC<AccountsFieldsetsProps> = ({children, className}) => {

    return (
        <>
            <section className={`grid grid-cols-3 gap-3 mb-6 ${className}`}>
                {children}
            </section>
        </>
    )
}

export default AccountsFieldsets