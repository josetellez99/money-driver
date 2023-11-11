import React from 'react';
import formatMoney from '@/utils/formatMoney';
import AccountsFieldsets from '@/components/FormRegister/AccountsFieldsets';
import UserAccountButton from '@/components/FormRegister/UserAccountButton';
import HighLightedContainer from '@/components/HighLightedContainer';

interface SectionEditAccountProps {
    difference: number;
    currentAccount: UserAccount;
    currentAccountOldValue: number;
    incomeCategories: BudgetItem[];
    adjustmentTransferInfo: Transaction;
    setAdjustmentTransferInfo: (value: any) => void;
}

const SectionEditAccount: React.FC<SectionEditAccountProps> = ({
    difference,
    currentAccount,
    currentAccountOldValue,
    incomeCategories,
    adjustmentTransferInfo,
    setAdjustmentTransferInfo,

}) => {

    const setAccountOrCategoryAsAccountFromTrasnferInfo = (item: BudgetItem | UserAccount) => {
        setAdjustmentTransferInfo({
            ...adjustmentTransferInfo,
            accountFrom: item.title,
        })
    }

    return (
        <>
            <div className="mb-4">
                <p className="text-sm">
                    <span>{`Antiguo valor `}</span> 
                    <span className="text-greenYellow font-bold">{formatMoney(currentAccountOldValue)}</span>
                </p>
                <p className="text-sm">
                    <span>{`La diferencia es `}</span>
                    <span className="text-greenYellow font-bold">{formatMoney(difference)}</span>
                </p>
            </div>
                { difference > 0 && (
                    <>
                        <p className="mb-4">{`¿De donde viene la cantidad extra de ${formatMoney(difference)}?`}</p>
                        <AccountsFieldsets>
                            { incomeCategories.map( income => {
                                    return (
                                        <UserAccountButton
                                            buttonData={income}
                                            onClick={() => setAccountOrCategoryAsAccountFromTrasnferInfo(income)}
                                            isActive={income.title === adjustmentTransferInfo?.accountFrom}
                                        />
                                    )
                                })}
                            <UserAccountButton
                                buttonData={{id: 234, title: 'Ajuste de cuenta', amount: undefined!}}
                                onClick={() => {
                                    setAdjustmentTransferInfo({
                                        ...adjustmentTransferInfo,
                                        accountFrom: 'Ajuste de cuenta',
                                    })
                                }}
                                isActive={adjustmentTransferInfo?.accountFrom === 'Ajuste de cuenta'}
                            />
                        </AccountsFieldsets>
                            <HighLightedContainer>
                            <p className="text-black p-1 text-justify">
                                {`Se cambiará el valor de la cuenta `}
                                <span className="font-bold">{currentAccount?.title}</span>
                                {` y se registrará un ingreso desde `}
                                <span className="font-bold">{adjustmentTransferInfo?.accountFrom}</span>
                                {` por valor de `}
                                <span className="font-bold">{formatMoney(adjustmentTransferInfo?.amount)}</span>
                                {`. Para continuar, pulsa `}
                                <span className="font-bold">"Guardar"</span>
                            </p>
                        </HighLightedContainer>
                    </>
                )}
                { difference < 0 && (
                    <>
                        <p className="mb-4">{`¿A dónde va la cantidad extra de ${formatMoney(difference)}?`}</p>
                        <AccountsFieldsets>
                            <UserAccountButton
                                buttonData={{id: 234, title: 'Ajuste de cuenta', amount: undefined!}}
                                onClick={() => {
                                    setAdjustmentTransferInfo({
                                        ...adjustmentTransferInfo,
                                        accountTo: 'Ajuste de cuenta',
                                    })
                                }}
                                isActive={adjustmentTransferInfo?.accountTo === 'Ajuste de cuenta'}
                            />
                        </AccountsFieldsets>
                            <HighLightedContainer>
                            <p className="text-black p-1 text-justify">
                                {`Se cambiará el valor de la cuenta `}
                                <span className="font-bold">{currentAccount?.title}</span>
                                {` y se registrará un egreso hacia `}
                                <span className="font-bold">{adjustmentTransferInfo?.accountTo}</span>
                                {` por valor de `}
                                <span className="font-bold">{formatMoney(adjustmentTransferInfo?.amount)}</span>
                                {`. Para continuar, pulsa `}
                                <span className="font-bold">"Guardar"</span>
                            </p>
                        </HighLightedContainer>
                    </>
                )}
            </>
    )
};

export default SectionEditAccount;