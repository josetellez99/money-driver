import React from 'react';
import AccountsFieldsets from '@/components/FormRegister/AccountsFieldsets';
import UserAccountButton from '@/components/FormRegister/UserAccountButton';
import RegularButtonList from '@/components/RegularButtonList';
import RegularButton from '@/components/RegularButton';
import HighLightedContainer from '@/components/HighLightedContainer';
import formatMoney from '@/utils/formatMoney';

interface SectionCreateAccountProps {
    currentAccount: UserAccount | undefined
    accounts: UserAccount[]
    incomeCategories: BudgetItem[],
    adjustmentTransferInfo: Transaction,
    setAdjustmentTransferInfo: React.Dispatch<React.SetStateAction<Transaction>>
}

const SectionCreateAccount: React.FC<SectionCreateAccountProps> = ({
    accounts,
    incomeCategories,
    currentAccount,
    adjustmentTransferInfo,
    setAdjustmentTransferInfo,

    }) => {

    const[showHighLigtedMessage, setShowHighLigtedMessage] = React.useState<boolean>(false)
    const[whereMoneyCameFrom, setWhereMoneyCameFrom] = React.useState<string | undefined>(undefined)

    const moneyFromOptions = [
        {
            title: 'Otra cuenta',
            id: 1
        },
        {
            title: 'Es un ingreso',
            id: 2
        }
    ]

    const setTransferInfoAccountFrom = (item: BudgetItem | UserAccount) => {
        setAdjustmentTransferInfo({
            ...adjustmentTransferInfo,
            accountFrom: item.title,
        })
        setShowHighLigtedMessage(true);
    }



    return (
        <>
            <div className="mb-4">
                <p className="mb-2">¿De donde viene el dinero de esta cuenta nueva?</p>
                <RegularButtonList
                    className="flex gap-2"
                    >
                    {moneyFromOptions.map( option => {
                        return (
                            <RegularButton
                                key={option.id}
                                buttonData={option}
                                onClick={() => setWhereMoneyCameFrom(option.title)}
                                isActive={option.title === whereMoneyCameFrom}
                            />
                            )
                        })}
                </RegularButtonList>
            </div>

                { whereMoneyCameFrom === 'Otra cuenta' && (
                    <>
                        <p className="mb-2">¿De qué cuenta viene el dinero?</p>
                        <AccountsFieldsets>
                            {accounts.map( account => {
                                return (
                                    <UserAccountButton
                                        key={account.id}
                                        buttonData={account}
                                        onClick={() => setTransferInfoAccountFrom(account)}
                                        isActive={account.title === adjustmentTransferInfo?.accountFrom}
                                    />
                                )
                            })}
                        </AccountsFieldsets>
                    </>
                )}

                { whereMoneyCameFrom === 'Es un ingreso' && (
                    <>
                        <p className="mb-2">¿De qué ingreso viene el dinero?</p>
                        <AccountsFieldsets>
                            {incomeCategories.map( income => {
                                return (
                                    <UserAccountButton
                                        key={income.id}
                                        buttonData={income}
                                        onClick={() => setTransferInfoAccountFrom(income)}
                                        isActive={income.title === adjustmentTransferInfo?.accountFrom}
                                    />
                                    )
                                })}
                        </AccountsFieldsets>
                    </>
                )}    
        { showHighLigtedMessage && (
            <HighLightedContainer>
                <p className="text-black p-1 text-justify">
                    {`Se creará la cuenta `}
                    <span className="font-bold">{currentAccount?.title}</span>
                    {` y se registrará un movimiento desde `}
                    <span className="font-bold">{adjustmentTransferInfo?.accountFrom}</span>
                    {` por valor de `}
                    <span className="font-bold">{formatMoney(adjustmentTransferInfo?.amount)}</span>
                    {`. Para continuar, pulsa `}
                    <span className="font-bold">Guardar</span>
                </p>
            </HighLightedContainer>
        )}
        </>
    );
}

export default SectionCreateAccount;