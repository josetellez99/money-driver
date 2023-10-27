import React, { ChangeEvent } from "react"

import PopUpLayer from "@/components/PopupLayer"
import BorderDiv from "@/components/BorderDiv"

import ElementTitle from "@/components/ElementTitle"
import TitleFieldset from "@/components/FormRegister/TitleFieldset"
import AmountFieldset from "@/components/FormRegister/AmountFieldset"
import SubmitButton from "@/components/FormRegister/SubmitButton"
import ActionButton from "@/components/ActionButton"

import SectionDeleteAccount from "@/components/AccountsTable/AccountModal/SectionDeleteAccount"
import SectionCreateAccount from "@/components/AccountsTable/AccountModal/SectionCreateAccount"
import SectionEditAccount from "@/components/AccountsTable/AccountModal/SectionEditAccount"

interface AccountModalProps {
    setShowAccountModal: React.Dispatch<React.SetStateAction<boolean>>;
    currentAccount: UserAccount | undefined;
    setCurrentAccount: React.Dispatch<React.SetStateAction<UserAccount | undefined>>;
    incomeCategories: BudgetItem[];
    accounts: UserAccount[];
    setAccounts: React.Dispatch<React.SetStateAction<UserAccount[]>>;
    typeOfAccountModal: 'create' | 'edit' | 'delete';
}

const AccountModal: React.FC<AccountModalProps> = ({
    setShowAccountModal,
    currentAccount,
    setCurrentAccount,
    incomeCategories,
    accounts,
    setAccounts,
    typeOfAccountModal
}) => {

    // In this modal you can create, edit or delete an account. In all cases you need to create a transaction to adjust the amounts of the involved accounts
    // This state is to save the information of the transaction to adjust the amount of the accounts
    const[adjustmentTransferInfo, setAdjustmentTransferInfo] = React.useState<Transaction>({
        id: Math.floor(Math.random() * 10000) + 1,
        type: undefined,
        date: new Date(),
        accountFrom: undefined,
        accountTo: undefined,
        amount: undefined,
        description: undefined,
    });

    // This state hold the type of the action to be executed, create, edit or delete
    // This state is used to render the correct section of the modal
    const[actionType, setActionType] = React.useState<'create' | 'edit' | 'delete'>(typeOfAccountModal);

    // This state hold the difference between the old value of the currentAccount.amount and the new value of the currentAccount.amount
    // Is useful for the 'edi' case to make comparisons and validations
    const[difference, setDifference] = React.useState<number>(0);

    // This state hold the initial value of the currentAccount, when currentAccount.amount change this state reamins the same
    // We never update this state, we only use it to compare the old value of the currentAccount.amount
    const[currentAccountOldValue, setCurrentAccountOldValue] = React.useState<number>(currentAccount!.amount);


    // Submits for create, edit and delete

    const submitForCreate = () => {
        setAccounts((prevAccounts) => {
            const accounts = prevAccounts.map((account) => {

                // Creating a new account the money could came from an existing account
                // This if find the existing account the money came from and substract the amount to the new account
                if (account.title === adjustmentTransferInfo?.accountFrom) {
                    const newAmount = account.amount - (adjustmentTransferInfo?.amount ?? 0);
                    return { ...account, amount: newAmount >= 0 ? newAmount : account.amount };
                }
                return account;
            });

            // Here we add the new account
            return [...accounts, currentAccount!];
        });
    };

    const submitForEdit = () => {
        setAccounts((prevAccounts) => {
            const newState = prevAccounts.map((account) => {
                if (difference > 0 && account.title === adjustmentTransferInfo?.accountTo) {
                    return { ...account, amount: account.amount + difference };
                }
                if (difference < 0 && account.title === adjustmentTransferInfo?.accountFrom) {
                    return { ...account, amount: account.amount - Math.abs(difference) };
                }
                return account;
            });
            return newState;
        });
    };

    const submitForDelete = () => {
        setAccounts((prevAccounts) => {
            const accountsWithoutDeletedAccount = prevAccounts.filter((account) => account.id !== currentAccount?.id);
            const stateSumAmountToAccountTo = accountsWithoutDeletedAccount.map((account) => {
                if (account.title === adjustmentTransferInfo?.accountTo) {
                    return { ...account, amount: account.amount + adjustmentTransferInfo.amount!};
                }
                return account;
            });
            return stateSumAmountToAccountTo;
        });
    };

    const handleSubmit = () => {

        createNewTransaction(adjustmentTransferInfo!)

        actionType === 'create' && submitForCreate()
        actionType === 'edit' && submitForEdit()
        actionType === 'delete' && submitForDelete()

        setShowAccountModal(false);
        setCurrentAccount(undefined);
    }


    const createNewTransaction = (transactionInfo: Transaction) => {
        // Here is the logic to create the transaction to adjust the edit, create or deleted account
    }

    const closeAccountModal = () => {
        setShowAccountModal(false);
        setCurrentAccount(undefined);
    }

    const deleteAccountHandleClick = () => {
        setActionType('delete');
    }

    const titleAccountHandleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target
        setCurrentAccount({...currentAccount, title: value});
    }

    const amountAccountHandleOnChange = (value: number) => {
        setCurrentAccount({...currentAccount, amount: value});
        setAdjustmentTransferInfo({
            ...adjustmentTransferInfo,
            amount: value,
        })
        if(actionType === 'edit') {
            setDifference(value - currentAccountOldValue)
            if(value < currentAccountOldValue) {
                setAdjustmentTransferInfo({
                    ...adjustmentTransferInfo,
                    type: 'expense',
                    accountFrom: currentAccount?.title,
                    accountTo: 'Ajuste de cuenta',
                    amount: Math.abs(value - currentAccountOldValue), // converting the negative number to positive
                    description: `Ajuste de cuenta negativo a: ${currentAccount?.title}`,
                })
            } else if (value > currentAccountOldValue) {
                setAdjustmentTransferInfo({
                    ...adjustmentTransferInfo,
                    type: 'income',
                    accountFrom: 'Ajuste de cuenta',
                    accountTo: currentAccount?.title,
                    amount: value - currentAccountOldValue,
                    description: `Ajuste de cuenta positivo a: ${currentAccount?.title}`,
                })
            }
        }      
    }

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
                                title={typeOfAccountModal === 'create' ? 'Crear cuenta' : 'Editar cuenta'} />

                            <TitleFieldset
                                title={currentAccount?.title}
                                onChange={titleAccountHandleOnChange}
                            />
                            { (actionType === 'create' || actionType === 'edit') &&
                                <AmountFieldset
                                    amount={currentAccount?.amount}
                                    onChange={amountAccountHandleOnChange}
                                />
                            }
                            { actionType === 'edit' && ( 
                                <ActionButton 
                                title='Eliminar esta cuenta'
                                type='delete'
                                onClick={deleteAccountHandleClick}
                                />
                                )}
                            { actionType === 'edit' && difference !== 0 && (

                                // When difference is not "0" is cause by the user changing the currentAccount.amount
                                <>
                                    <SectionEditAccount
                                        difference={difference}
                                        currentAccount={currentAccount!}
                                        currentAccountOldValue={currentAccountOldValue}
                                        incomeCategories={incomeCategories}
                                        adjustmentTransferInfo={adjustmentTransferInfo}
                                        setAdjustmentTransferInfo={setAdjustmentTransferInfo}

                                    />
                                </>
                            )}
                            { actionType === 'delete' && (
                                <>
                                    <SectionDeleteAccount
                                        currentAccount={currentAccount}
                                        accounts={accounts}
                                        adjustmentTransferInfo={adjustmentTransferInfo}
                                        setAdjustmentTransferInfo={setAdjustmentTransferInfo}
                                        setActionType={setActionType}
                                    />
                                </>
                            )}
                            { actionType === 'create' &&  (
                                <>
                                    <SectionCreateAccount 
                                        currentAccount={currentAccount}
                                        incomeCategories={incomeCategories}
                                        accounts={accounts}
                                        adjustmentTransferInfo={adjustmentTransferInfo}
                                        setAdjustmentTransferInfo={setAdjustmentTransferInfo}
                                    />
                                </>
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