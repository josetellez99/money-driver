import React from "react"

import PopUpLayer from "@/components/PopupLayer"
import BorderDiv from "@/components/BorderDiv"
import ConfirmationModal from "@/components/ConfirmationModal"

import ElementTitle from "@/components/ElementTitle"
import TitleFieldset from "@/components/FormRegister/TitleFieldset"
import AmountFieldset from "@/components/FormRegister/AmountFieldset"
import SubmitButton from "@/components/FormRegister/SubmitButton"
import ActionButton from "@/components/ActionButton"
import RegularButtonList from "@/components/RegularButtonList"
import RegularButton from "@/components/RegularButton"
import AccountsFieldsets from "@/components/FormRegister/AccountsFieldsets"
import UserAccountButton from "@/components/FormRegister/UserAccountButton"
import HighLightedContainer from "@/components/HighLightedContainer"

import SectionDeleteAccount from "@/components/AccountsTable/AccountModal/SectionDeleteAccount"
import SectionCreateAccount from "@/components/AccountsTable/AccountModal/SectionCreateAccount"

import formatMoney from "@/utils/formatMoney"

interface AccountModalProps {
    setShowAccountModal: React.Dispatch<React.SetStateAction<boolean>>;
    currentAccount: UserAccount;
    setCurrentAccount: React.Dispatch<React.SetStateAction<UserAccount | undefined>>;
    incomeCategories: BudgetItem[];
    accounts: UserAccount[];
    setAccounts: React.Dispatch<React.SetStateAction<UserAccount[]>>;
    type: 'create' | 'edit' | 'delete';
}

const AccountModal: React.FC<AccountModalProps> = ({
    setShowAccountModal,
    currentAccount,
    setCurrentAccount,
    incomeCategories,
    accounts,
    setAccounts,
    type
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

    const[showDeleteSection, setShowDeleteSection] = React.useState<boolean>(false);
    const[showHighLigtedMessage, setShowHighLigtedMessage] = React.useState<boolean>(false);
    const[actionType, setActionType] = React.useState<'create' | 'edit' | 'delete'>(type);

    // This state is to show a message when the user is editing an account and the amount is different from the original amount
    // oldValue and newValue start as the same value, but when the user changes the amount, newValue changes and the message is shown
    const[accountEditedInformation, setAccountEditedInformation] = React.useState({
        oldValue: currentAccount.amount, 
        newValue: currentAccount.amount,
    });

    // This state is to show the difference between the old value and the new value when you edit the amount of the account
    const difference = accountEditedInformation.newValue - accountEditedInformation.oldValue;

    // Difference depends on the accountEditedInformation state, so we need to wait for the re render to have the information updated
    // This use effect wait for the re render to have the information updated and then we can use the difference to make the validation below
    // difference will determine if the transaction to adjust the amount of the accounts is an income or an expense
    React.useEffect(() => {
        if(difference > 0) {
            setAdjustmentTransferInfo({
                ...adjustmentTransferInfo,
                type: 'income',
                accountFrom: 'Ajuste de cuenta',
                accountTo: currentAccount?.title,
                amount: difference,
                description: `Ajuste de cuenta positivo a: ${currentAccount?.title}`,
            })
        }
        if(difference < 0) {
            setAdjustmentTransferInfo({
                ...adjustmentTransferInfo,
                type: 'expense',
                accountFrom: currentAccount?.title,
                accountTo: 'Ajuste de cuenta',
                amount: Math.abs(difference), // converting the negative number to positive
                description: `Ajuste de cuenta negativo a: ${currentAccount?.title}`,
            })
        }
    }, [currentAccount?.amount])

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
                    return { ...account, amount: account.amount + adjustmentTransferInfo!.amount };
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
        setShowDeleteSection(true);
        setActionType('delete');
    }

    const titleAccountHandleOnChange = (value: string) => {
        setCurrentAccount({...currentAccount, title: value});
    }

    const amountAccountHandleOnChange = (value: number) => {
        setCurrentAccount({...currentAccount, amount: value});
        setAdjustmentTransferInfo({
            ...adjustmentTransferInfo,
            amount: value,
        })
        if(actionType === 'edit') {
            setAccountEditedInformation({...accountEditedInformation, newValue: value})
        }      
    }

    

    const setAccountOrCategoryAsAccountFromTrasnferInfo = (item: BudgetItem | UserAccount) => {
        setAdjustmentTransferInfo({
            ...adjustmentTransferInfo,
            accountFrom: item.title,
        })
        setShowHighLigtedMessage(true);
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
                                title={type === 'create' ? 'Crear cuenta' : 'Editar cuenta'} />

                            <TitleFieldset
                                title={currentAccount?.title}
                                onChange={titleAccountHandleOnChange}
                            />
                            { !showDeleteSection &&
                                <AmountFieldset
                                    amount={currentAccount?.amount}
                                    onChange={amountAccountHandleOnChange}
                                />
                            }
                            { accountEditedInformation.oldValue !== accountEditedInformation.newValue && (
                                <>
                                <div className="mb-4">
                                    <p className="text-sm">
                                        <span>{`Antiguo valor `}</span> 
                                        <span className="text-greenYellow font-bold">{formatMoney(accountEditedInformation.oldValue)}</span>
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
                                                    buttonData={{id: 234, title: 'Ajuste de cuenta', amount: undefined}}
                                                    onClick={() => {
                                                        setAdjustmentTransferInfo({
                                                            ...adjustmentTransferInfo,
                                                            accountFrom: 'Ajuste de cuenta',
                                                        })
                                                        setShowHighLigtedMessage(true);
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
                                                    buttonData={{id: 234, title: 'Ajuste de cuenta'}}
                                                    onClick={() => {
                                                        setAdjustmentTransferInfo({
                                                            ...adjustmentTransferInfo,
                                                            accountTo: 'Ajuste de cuenta',
                                                        })
                                                        setShowHighLigtedMessage(true);
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
                            )}
                            { type === 'edit' && !showDeleteSection && 
                                <ActionButton 
                                    title='Eliminar esta cuenta'
                                    type='delete'
                                    onClick={deleteAccountHandleClick}
                                />
                            }
                            { showDeleteSection && (
                                <>
                                    <SectionDeleteAccount
                                        currentAccount={currentAccount}
                                        accounts={accounts}
                                        adjustmentTransferInfo={adjustmentTransferInfo}
                                        setAdjustmentTransferInfo={setAdjustmentTransferInfo}
                                        setShowDeleteSection={setShowDeleteSection}
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