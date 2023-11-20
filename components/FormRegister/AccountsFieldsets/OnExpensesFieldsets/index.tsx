import React from "react";

import UserAccountButton from "@/components/FormRegister/UserAccountButton"
import AccountsFieldsets from "@/components/FormRegister/AccountsFieldsets";
import FieldsetTitle from "@/components/FormRegister/FieldsetTitle";

interface OnExpenseFieldsetsProps {
    userAccounts: UserAccount[],
    expensesCategories: BudgetItem[],
    currentTransaction: Transaction,
    setCurrentTransaction: React.Dispatch<React.SetStateAction<Transaction>>,
}

const OnExpenseFieldsets: React.FC<OnExpenseFieldsetsProps> = ({ 
        userAccounts, 
        expensesCategories, 
        currentTransaction,
        setCurrentTransaction
    }) => {

        const onClickAccountFrom = (accountFrom: string, accountFromId: string) => {
            setCurrentTransaction({
                ...currentTransaction,
                accountFrom: accountFrom,
                accountFromId: accountFromId
            })
        }

        const onClicksubcategoryFrom = (subcategoryFrom: string, subcategoryFromId: string) => {
            setCurrentTransaction({
                ...currentTransaction,
                subcategoryFrom: subcategoryFrom,
                subcategoryFromId: subcategoryFromId
            })
        }

        const onClickAccountTo = (accountTo: string, accountToId: string) => {
            setCurrentTransaction({
                ...currentTransaction,
                accountTo: accountTo,
                accountToId: accountToId
            })
        }

        const currentCategory = expensesCategories.find(category => category.id === currentTransaction.accountFromId);

        const showAllcategories = () => {
            setCurrentTransaction({
                ...currentTransaction,
                accountFrom: '',
                accountFromId: ''
            })
        }
    
    return (
        <>
            <FieldsetTitle title='¿En qué categoria gastaste?' />
            {!currentCategory?.subcategories && (
                <AccountsFieldsets>
                    {expensesCategories.map( (expenseCategory) => (
                        <UserAccountButton
                            key={expenseCategory.id}
                            buttonData={expenseCategory}
                            isActive={currentTransaction.accountFrom === expenseCategory.title}
                            onClick={() => onClickAccountFrom(expenseCategory.title, expenseCategory.id!)}
                        />
                    ))}
                </AccountsFieldsets>
            )}

            { currentCategory?.subcategories && currentCategory.subcategories!.length > 0 && (
                <>
                    <AccountsFieldsets
                        className='mb-0'
                    >
                        <UserAccountButton
                            buttonData={currentCategory}
                            isActive={currentTransaction.accountFromId === currentCategory.id}
                            onClick={() => onClickAccountFrom(currentCategory.title, currentCategory.id!)}
                        />
                        <UserAccountButton 
                            buttonData={{
                                title: 'Ver todas las categorias',
                            }}
                            isActive={false}
                            onClick={showAllcategories}
                        />
                    </AccountsFieldsets>
                    <p className="mb-2">Subcategorias</p>
                    <AccountsFieldsets>
                        {currentCategory.subcategories!.map(subcategory => (
                            <UserAccountButton
                                key={subcategory.id}
                                buttonData={subcategory}
                                isActive={currentTransaction.subcategoryFromId === subcategory.id}
                                onClick={() => onClicksubcategoryFrom(subcategory.title, subcategory.id!)}
                            />
                        ))}
                    </AccountsFieldsets>
                </>
            )}

            <FieldsetTitle title='¿De donde salió el dinero?' />
            <AccountsFieldsets>
                {userAccounts.map( (account) => (
                    <UserAccountButton
                        key={account.id}
                        buttonData={account}
                        isActive={currentTransaction.accountTo === account.title}
                        onClick={() => onClickAccountTo(account.title, account.id!)}
                    />
                ))}
            </AccountsFieldsets>
        </>
    )
}

export default OnExpenseFieldsets