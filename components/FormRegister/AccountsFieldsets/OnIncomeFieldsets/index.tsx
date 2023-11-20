import React from "react";

import UserAccountButton from "@/components/FormRegister/UserAccountButton"
import AccountsFieldsets from "@/components/FormRegister/AccountsFieldsets";
import FieldsetTitle from "@/components/FormRegister/FieldsetTitle";

interface OnIncomeFieldsetsProps {
    accounts: UserAccount[],
    incomesCategories: BudgetItem[],
    currentTransaction: Transaction,
    setCurrentTransaction: React.Dispatch<React.SetStateAction<Transaction>>,

}

const OnIncomeFieldsets: React.FC<OnIncomeFieldsetsProps> = ({ 
        accounts, 
        incomesCategories, 
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

        // This is necesarry to valide if the selected category has subcategories
        const currentCategory = incomesCategories.find(category => category.id === currentTransaction.accountFromId);

        const showAllcategories = () => {
            setCurrentTransaction({
                ...currentTransaction,
                accountFrom: '',
                accountFromId: ''
            })
        }

    return (
        <>
            <FieldsetTitle title='¿De dónde viene este ingreso?' />

            {/* When the selected category doesn't have subcategories, show this*/}
                {!currentCategory?.subcategories && (
                    <AccountsFieldsets>
                        {incomesCategories.map( (incomeCategory) => (
                            <UserAccountButton
                                key={incomeCategory.id}
                                buttonData={incomeCategory}
                                isActive={currentTransaction.accountFromId === incomeCategory.id}
                                onClick={() => onClickAccountFrom(incomeCategory.title, incomeCategory.id!)}
                            />
                        ))}
                    </AccountsFieldsets>
                )}

            {/* When the selected category do have subcategories, show this*/}

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

            <FieldsetTitle title='¿A qué cuenta ingresó el dinero?' />
            <AccountsFieldsets>
                {accounts.map( (account) => (
                    <UserAccountButton
                        key={account.id}
                        buttonData={account}
                        isActive={currentTransaction.accountToId === account.id}
                        onClick={() => onClickAccountTo(account.title, account.id!)}
                    />
                ))}
            </AccountsFieldsets>
        </>
    )
}

export default OnIncomeFieldsets