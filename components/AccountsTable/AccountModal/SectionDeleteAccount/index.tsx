import React from 'react'
import AccountsFieldsets from '@/components/FormRegister/AccountsFieldsets'
import UserAccountButton from '@/components/FormRegister/UserAccountButton'
import ActionButton from '@/components/ActionButton'
import HighLightedContainer from '@/components/HighLightedContainer'
import formatMoney from '@/utils/formatMoney'

interface SectionDeleteAccountProps {
    currentAccount: UserAccount | undefined
    accounts: UserAccount[]
    adjustmentTransferInfo: Transaction,
    setAdjustmentTransferInfo: React.Dispatch<React.SetStateAction<Transaction>>
    setShowDeleteSection: React.Dispatch<React.SetStateAction<boolean>>
    setActionType: React.Dispatch<React.SetStateAction<'create' | 'edit' | 'delete'>>
}

const SectionDeleteAccount: React.FC<SectionDeleteAccountProps> = ({
    currentAccount,
    accounts,
    adjustmentTransferInfo,
    setAdjustmentTransferInfo,
    setShowDeleteSection,
    setActionType,
}) => {

    const[showHighLigtedMessage, setShowHighLigtedMessage] = React.useState<boolean>(true)

    const setInfoForAdjusmentTransfer = (accountName: string) => {
        setAdjustmentTransferInfo({
            ...adjustmentTransferInfo,
            type: 'movement',
            accountFrom: currentAccount?.title,
            accountTo: accountName,
            amount: currentAccount?.amount,
            description: `Ajuste de cuenta: ${currentAccount?.title}`,
        })
        setShowHighLigtedMessage(true);
    }

    return (
        <>
            <p className="my-4 text-justify">
                {`¿A qué cuenta quieres mover el dinero de la cuenta"`}
                <span className="font-bold text-greenYellow">{currentAccount?.title}</span>
                <span>{`" ?`}</span>
            </p>
            <AccountsFieldsets>
                {accounts.map( account => {
                    if(account.title === currentAccount?.title) return null
                    return (
                        <UserAccountButton
                            buttonData={account}
                            onClick={() => setInfoForAdjusmentTransfer(account.title)}
                            isActive={account.title === adjustmentTransferInfo?.accountTo}
                        />
                    )
                })}
                <UserAccountButton
                    buttonData={{id: 234, title: 'Ajuste de cuenta', amount: 0}}
                    onClick={() => setInfoForAdjusmentTransfer('Ajuste de cuenta')}
                    isActive={adjustmentTransferInfo?.accountTo === 'Ajuste de cuenta'}
                />
            </AccountsFieldsets>
            <div className="flex justify-end">
                <ActionButton 
                    title='Editar cuenta'
                    type='edit'
                    onClick={() => {
                        setShowDeleteSection(false)
                        setActionType('edit')
                    }}
                />
            </div>
            { showHighLigtedMessage && (
                <HighLightedContainer>
                    <p className="text-black p-1 text-justify">
                        {`Se eliminará la cuenta `}
                        <span className="font-bold">{currentAccount?.title}</span>
                        {` y se asumirá como una perdida. Registraremos un movimiento hacia `}
                        <span className="font-bold">{adjustmentTransferInfo?.accountTo}</span>
                        {` por valor de `}
                        <span className="font-bold">{formatMoney(adjustmentTransferInfo?.amount)}</span>
                        {`. Para continuar, pulsa `}
                        <span className="font-bold">"Guardar"</span>
                    </p>
                </HighLightedContainer>
            )}
        </>
    )
}

export default SectionDeleteAccount