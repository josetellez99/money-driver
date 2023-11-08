import React from 'react'

import UserDebt from '@/components/FormRegister/UserDebt'
import FieldsetTitle from '@/components/FormRegister/FieldsetTitle'
import AccountsFieldsets from '@/components/FormRegister/AccountsFieldsets'
import UserAccountButton from '@/components/FormRegister/UserAccountButton'
import RegularButtonList from '@/components/RegularButtonList'
import RegularButton from '@/components/RegularButton'

interface OnDebtFieldsetProps {
    userAccounts: UserAccount[],
    userDebts: Debt[],
    currentTransaction: Transaction,
    setCurrentTransaction: React.Dispatch<React.SetStateAction<Transaction>>,
}

const OnDebtFieldset: React.FC<OnDebtFieldsetProps> = ({
    userAccounts, 
    userDebts, 
    currentTransaction,
    setCurrentTransaction,
}) => {

    // Solo falta resolver lo del submitdss
    
    const[selectedDebt, setSelectedDebt] = React.useState({
        id: 0,
        type: ''
    })
    const[listDebtsToShow, setListDebtsToShow] = React.useState<Debt[]>([])

    const RegularButtonHanlderClick = (type: string) => {
        setSelectedDebt({
            ...selectedDebt,
            type: type
        })
        type === 'Deuda cobrada' && setListDebtsToShow(userDebts.filter( item => !item.toPay))
        type === 'Deuda pagada' && setListDebtsToShow(userDebts.filter( item => item.toPay))
        setCurrentTransaction({
            ...currentTransaction,
            accountFrom: '',
            accountTo: '',
        })
    }


    const debtItemHandleClick = (debtTitle: string, debtId: number) => {
        setSelectedDebt({
            ...selectedDebt,
            id: debtId
        })

        if(selectedDebt.type === 'Deuda cobrada') {
            setCurrentTransaction({
                ...currentTransaction,
                accountFrom: debtTitle
            })
        }
        if(selectedDebt.type === 'Deuda pagada') {
            setCurrentTransaction({
                ...currentTransaction,
                accountTo: debtTitle
            })
        }
    }

    const accountHandleClick = (debtTitle: string) => {
        if(selectedDebt.type === 'Deuda cobrada') {
            setCurrentTransaction({
                ...currentTransaction,
                accountTo: debtTitle
            })
        }
        if(selectedDebt.type === 'Deuda pagada') {
            setCurrentTransaction({
                ...currentTransaction,
                accountFrom: debtTitle
            })
        }
    }


    return (
        <>
        <RegularButtonList>
            <RegularButton
                buttonData={{
                    title: 'Deuda cobrada'
                }}
                isActive={selectedDebt.type === 'Deuda cobrada'}
                onClick={() => RegularButtonHanlderClick('Deuda cobrada')}
            />
            <RegularButton 
                buttonData={{
                    title: 'Deuda pagada'
                }}
                isActive={selectedDebt.type === 'Deuda pagada'}
                onClick={() => RegularButtonHanlderClick('Deuda pagada')}
            />
        </RegularButtonList>
            <fieldset className="flex flex-col w-full gap-3 my-4">
                <FieldsetTitle title='¿De qué deuda estamos hablando?' />
                { selectedDebt.type && (
                        <>
                            {listDebtsToShow.map( (debt: Debt) => (
                                <>
                                    <UserDebt
                                        key={(debt.id + debt.title)}
                                        userDebtData={debt}
                                        isActive={selectedDebt.id === debt.id}
                                        onClick={() => debtItemHandleClick(debt.title, debt.id)}
                                    />
                                </>
                            ))}
                        </>
                )}
                { !selectedDebt.type && (
                    <p className='bg-greenYellow px-2 py-1 rounded-lg text-black text-center'>Selecciona un tipo de movimiento</p>
                )}
                
            </fieldset>
            { selectedDebt.type && (
                <>
                    <FieldsetTitle title={selectedDebt.type === 'Deuda cobrada' ? '¿A que cuenta fue el dinero?' : '¿Con qué cuenta pagaste?'} />
                    <AccountsFieldsets>
                        { userAccounts.map( (account: ButtonData) => (
                            <UserAccountButton
                                key={account.id}
                                buttonData={account}
                                isActive={currentTransaction.accountTo === account.title || currentTransaction.accountFrom === account.title}
                                onClick={() => accountHandleClick(account.title)}
                            />
                        ))}
                    </AccountsFieldsets>
                </>
            )}
        </>
    )
}

export default OnDebtFieldset