import React from 'react'

interface AccountsSectionProps {
    activeRegisterOption: string,
    onIncome?: () => React.JSX.Element,
    onExpense?: () => React.JSX.Element;
    onMovement?: () => React.JSX.Element;
    onDebt?: () => React.JSX.Element;
    onSave?: () => React.JSX.Element;
    onCreditCard?: () => React.JSX.Element;
}

const AccountsSection: React.FC<AccountsSectionProps> = ({activeRegisterOption, onIncome, onExpense, onMovement, onDebt, onSave, onCreditCard}) => {

    return (
        <>
            <div className='my-6'>
                {activeRegisterOption == 'Ingreso' && onIncome && onIncome()}
                {activeRegisterOption == 'Egreso' && onExpense && onExpense()}
                {activeRegisterOption == 'Movimiento' && onMovement && onMovement()}
                {activeRegisterOption == 'Deuda' && onDebt && onDebt()}
                {activeRegisterOption == 'Ahorro' && onSave && onSave()}
                {activeRegisterOption == 'Tarjeta de credito' && onCreditCard && onCreditCard()}


            </div>
        </>
    )
}

export default AccountsSection