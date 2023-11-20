import React from 'react'

interface AccountsSectionProps {
    typeOfRegister: string,
    onIncome?: () => React.JSX.Element,
    onExpense?: () => React.JSX.Element;
    onMovement?: () => React.JSX.Element;
    onDebt?: () => React.JSX.Element;
    onSave?: () => React.JSX.Element;
    onCreditCard?: () => React.JSX.Element;
}

const AccountsSection: React.FC<AccountsSectionProps> = ({typeOfRegister, onIncome, onExpense, onMovement, onDebt, onSave, onCreditCard}) => {

    return (
        <>
            <section className='my-6'>
                {typeOfRegister == 'income' && onIncome && onIncome()}
                {typeOfRegister == 'expense' && onExpense && onExpense()}
                {typeOfRegister == 'movement' && onMovement && onMovement()}
                {typeOfRegister == 'debt' && onDebt && onDebt()}
                {/* {typeOfRegister == 'saving' && onSave && onSave()} */}
                {typeOfRegister == 'creditCard' && onCreditCard && onCreditCard()}
            </section>
        </>
    )
}

export default AccountsSection