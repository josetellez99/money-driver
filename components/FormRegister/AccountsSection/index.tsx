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
                {typeOfRegister == 'Ingreso' && onIncome && onIncome()}
                {typeOfRegister == 'Egreso' && onExpense && onExpense()}
                {typeOfRegister == 'Movimiento' && onMovement && onMovement()}
                {typeOfRegister == 'Deuda' && onDebt && onDebt()}
                {/* {typeOfRegister == 'Ahorro' && onSave && onSave()} */}
                {typeOfRegister == 'Tarjeta de credito' && onCreditCard && onCreditCard()}
            </section>
        </>
    )
}

export default AccountsSection