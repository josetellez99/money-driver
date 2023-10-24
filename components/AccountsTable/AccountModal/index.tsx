import React from "react"

import PopUpLayer from "@/components/PopupLayer"
import BorderDiv from "@/components/BorderDiv"
import ConfirmationModal from "@/components/ConfirmationModal"

import ElementTitle from "@/components/ElementTitle"
import TitleFieldset from "@/components/FormRegister/TitleFieldset"
import AmountFieldset from "@/components/FormRegister/AmountFieldset"
import SubmitButton from "@/components/FormRegister/SubmitButton"
import ActionButton from "@/components/ActionButton"

interface AccountModalProps {
    setShowAccountModal: React.Dispatch<React.SetStateAction<boolean>>;
    showConfirmationModal: boolean;
    setShowConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
    currentAccount: UserAccount | undefined;
    setCurrentAccount: React.Dispatch<React.SetStateAction<UserAccount | undefined>>;
    setAccounts: React.Dispatch<React.SetStateAction<UserAccount[]>>;
    type: 'add' | 'edit';
}

const AccountModal: React.FC<AccountModalProps> = ({
    setShowAccountModal,
    showConfirmationModal,
    setShowConfirmationModal,
    currentAccount,
    setCurrentAccount,
    setAccounts,
    type
}) => {


    const handleSubmit = () => {
        if(type === 'add') {
            setAccounts( prevAccounts => {
                const newState = [...prevAccounts, currentAccount!]
                return newState
            }) 
        } else if(type === 'edit') {
            setAccounts( prevAccounts => {
                const newState = prevAccounts.map( account => {
                    if(account.id === currentAccount?.id) {
                        return currentAccount!
                    } else {
                        return account
                    }
                })
                return newState
            })
        }
        setShowAccountModal(false);
        setCurrentAccount(undefined);
    }

    const closeAccountModal = () => {
        setShowAccountModal(false);
        setCurrentAccount(undefined);
    }

    const titleAccountHandleOnChange = (value: string) => {
        setCurrentAccount({...currentAccount, title: value});
    }

    const amountAccountHandleOnChange = (value: number) => {
        setCurrentAccount({...currentAccount, amount: value});
    }

    const deleteAccountHandleClick = () => {
        setShowConfirmationModal(true);
    }

    const deleteAccountButtonsData = [
        {
            title: 'Si',
            id: 1,
            onClick: () => {
                setShowAccountModal(false)
                setShowConfirmationModal(false)
                setAccounts( prevAccounts => {
                    const newState = prevAccounts.filter(account => {
                        return account.id !== currentAccount?.id
                    })
                    return newState
                })
            },
            
        },
        {
            title: 'No',
            id: 2,
            onClick: () => {
                setShowConfirmationModal(false)
            }
        }
    ]

    return (
        <>
            <PopUpLayer>
                <div className="flex flex-col w-full">
                    <button onClick={closeAccountModal}>X</button>
                    <form action="" onSubmit={handleSubmit}>

                        <BorderDiv
                            className="bg-backgroundBlue w-full py-2"
                        >
                            <ElementTitle 
                                title={type === 'add' ? 'Crear cuenta' : 'Editar cuenta'} />

                            <TitleFieldset
                                title={currentAccount?.title}
                                onChange={titleAccountHandleOnChange}
                            />
                            <AmountFieldset
                                amount={currentAccount?.amount}
                                onChange={amountAccountHandleOnChange}
                            />
                            { type === 'edit' && 
                                <ActionButton 
                                    title='Eliminar esta cuenta'
                                    type='delete'
                                    onClick={deleteAccountHandleClick}
                                />
                            }
                            { showConfirmationModal && (
                                <ConfirmationModal
                                    message="¿Estás seguro de que quieres eliminar esta cuenta?"
                                    buttonsData={deleteAccountButtonsData}
                                />
                            )}
                            <SubmitButton
                                title='Guardar'
                                />
                        </BorderDiv>
                    </form>
                </div>
            </PopUpLayer>
        </>
    )
}

export default AccountModal