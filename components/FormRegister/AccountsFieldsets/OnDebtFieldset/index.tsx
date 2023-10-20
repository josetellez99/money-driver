import React from 'react'

import UserDebt from '@/components/FormRegister/UserDebt'
import FieldsetTitle from '@/components/FormRegister/FieldsetTitle'
import AccountsFieldsets from '@/components/FormRegister/AccountsFieldsets'
import UserAccountButton from '@/components/FormRegister/UserAccountButton'

interface OnDebtFieldsetProps {
    userAccounts: UserAccount[],
    accountTo: string | undefined,
    setAccountTo: React.Dispatch<React.SetStateAction<string | undefined>>,
    userDebts: Debt[],
    selectedDebt: number | undefined,
    setSelectedDebt: React.Dispatch<React.SetStateAction<number | undefined>>,
    activeToggleButton: string
}

const OnDebtFieldset: React.FC<OnDebtFieldsetProps> = ({
    userAccounts, 
    accountTo, 
    setAccountTo,
    userDebts, 
    selectedDebt, 
    setSelectedDebt, 
    activeToggleButton
}) => {

    let debtsListToShow = []
    let fieldsetTitle;

    if(activeToggleButton === 'Me pagaron') {
        debtsListToShow = userDebts.filter( item => item.toPay)
        fieldsetTitle = '¿A qué cuenta entró el dinero?'
    } else {
        debtsListToShow = userDebts.filter( item => !item.toPay)
        fieldsetTitle = '¿De qué cuenta salió el dinero?'
    }



    return (
        <>
            <fieldset className="flex flex-col w-full gap-3 my-4">
                <FieldsetTitle title='¿De qué deuda estamos hablando?' />
                {
                    activeToggleButton ? (
                        <>
                            {debtsListToShow.map( (debt: Debt) => (
                                <>
                                    <UserDebt
                                        key={(debt.debtID + debt.title)}
                                        userDebtData={debt}
                                        isActive={selectedDebt === debt.debtID}
                                        setActive={setSelectedDebt}
                                        />
                                </>
                            ))}
                        </>
                    ) : (
                        <>
                            <p className='bg-greenYellow px-2 py-1 rounded-lg text-black text-center'>Selecciona un tipo de movimiento</p>
                        </>
                    )
                }
                
            </fieldset>
            <AccountsFieldsets>
                <FieldsetTitle title={fieldsetTitle} />
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

export default OnDebtFieldset