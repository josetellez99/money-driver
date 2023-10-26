'use client'

import React from 'react';

import ElementTitle from '@/components/ElementTitle';
import TitleValuePair from '@/components/TitleValuePair';
import HighLightedContainer from '@/components/HighLightedContainer';
import formatMoney from '@/utils/formatMoney';
import AccountModal from '@/components/AccountsTable/AccountModal';

interface AccountsTableProps {
    accounts: UserAccount[]
    incomesBudget: BudgetItem[],
    expensesBudget: BudgetItem[],
}

const AccountsTable: React.FC<AccountsTableProps> = ({accounts, incomesBudget, expensesBudget}) => {

    const[showEditAccountModal, setShowEditAccountModal] = React.useState<boolean>(false);
    const[showAddAccountModal, setShowAddAccountModal] = React.useState<boolean>(false);

    const[userAccounts, setUserAccounts] = React.useState<UserAccount[]>(accounts);
    const[currentAccount, setCurrentAccount] = React.useState<UserAccount | undefined>();

    const accountRowHandleClick = (account: UserAccount) => {
        setShowEditAccountModal(true);
        setCurrentAccount(account);
    }

    const addAccountHandleClick = () => {
        setShowAddAccountModal(true);
        setCurrentAccount( prevAccount => {
            return {
                ...prevAccount,
                id: Math.floor(Math.random() * 10000) + 1,
                title: '',
                amount: 0
            }
        
        });
    }


    const totalsAccounts = userAccounts.reduce((acc, account) => {
        return acc + account.amount;
    }, 0);

    return (
        <>
            <ElementTitle title={'Cuentas'} />
            <table className='block w-full mb-10'>
                <thead className='block w-full'>
                    <tr className='flex justify-between mb-2 px-2'>
                        <th>Nombre de la cuenta</th>
                        <th>Saldo</th>
                    </tr>
                </thead>
                <tbody className='block w-full'>
                    {
                        userAccounts.map( account => {
                            return (
                                <tr 
                                    onClick={() => accountRowHandleClick(account)} 
                                    className='flex justify-between border border-greenYellow rounded-lg p-1 px-2 mb-2 w-full cursor-pointer'
                                >
                                    <td className=' truncate max-w-[170px]'>{account.title}</td>
                                    <td>{formatMoney(account.amount)}</td>
                                </tr>
                            )
                        })
                    }
                    <tr 
                        onClick={() => addAccountHandleClick()}
                        className='flex justify-between border-2 border-greenYellow rounded-lg p-1 px-2 mb-2 w-full cursor-pointer'>
                        <td className='font-bold'>Añadir nueva cuenta...</td>
                    </tr>
                </tbody>
                        <HighLightedContainer>
                            <TitleValuePair title={'Disponible'} textColor={'text-black'} value={totalsAccounts} />
                        </HighLightedContainer>
            </table>
            { showEditAccountModal && (
                <AccountModal
                    setShowAccountModal={setShowEditAccountModal}
                    incomeCategories={incomesBudget}
                    accounts={userAccounts}
                    currentAccount={currentAccount}
                    setCurrentAccount={setCurrentAccount}
                    setAccounts={setUserAccounts}
                    type={'edit'}
                />
            )}
            { showAddAccountModal && (
                <AccountModal
                    setShowAccountModal={setShowAddAccountModal}
                    incomeCategories={incomesBudget}
                    accounts={userAccounts}
                    currentAccount={currentAccount}
                    setCurrentAccount={setCurrentAccount}
                    setAccounts={setUserAccounts}
                    type={'create'}
            />
            )}
        </>
    )
}

export default AccountsTable