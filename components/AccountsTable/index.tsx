import React from 'react';

import ElementTitle from '@/components/ElementTitle';
import TitleValuePair from '@/components/TitleValuePair';
import HighLightedContainer from '@/components/HighLightedContainer';
import formatMoney from '@/utils/formatMoney';
import AccountModal from '@/components/AccountsTable/AccountModal';
import AddNewAccountRow from '@/components/AccountsTable/AddNewAccountRow';
import { fetchUserAccounts, fetchUserBudgetIncome } from '@/app/lib/action';
import Link from 'next/link';

const myUserId = '4f968b8e-0790-488f-8ee9-4ed06509954e'


const AccountsTable: React.FC = async () => {

    const userAccounts = await fetchUserAccounts(myUserId)
    const incomeBudget = await fetchUserBudgetIncome(myUserId)

    // const[showAccountModal, setShowAccountModal] = React.useState<boolean>(false);
    // const[typeOfAccountModal, setTypeOfAccountModal] = React.useState<'create' | 'edit' | 'delete'>('create');
    
    // const[userAccounts, setUserAccounts] = React.useState<UserAccount[]>(accounts);
    // const[currentAccount, setCurrentAccount] = React.useState<UserAccount>();

    // const accountRowHandleClick = (account: UserAccount) => {
    //     setShowAccountModal(true);
    //     setCurrentAccount(account);
    //     setTypeOfAccountModal('edit');
    // }

    // const addAccountHandleClick = () => {
    //     setShowAccountModal(true);
    //     setCurrentAccount( prevAccount => {
    //         return {
    //             ...prevAccount,
    //             id: Math.floor(Math.random() * 10000) + 1,
    //             title: '',
    //             amount: 0
    //         }
    //     });
    //     setTypeOfAccountModal('create');
    // }


    // const totalsAccounts = userAccounts.reduce((acc, account) => {
    //     return acc + account.amount;
    // }, 0);

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
                                <Link
                                    href={`/presupuesto-cuentas/edit-account/${account.id}`}
                                    key={account.id}
                                >
                                <tr 
                                    // onClick={() => accountRowHandleClick(account)} 
                                    className='flex justify-between border border-greenYellow rounded-lg p-1 px-2 mb-2 w-full cursor-pointer'
                                    >
                                    <td className=' truncate max-w-[170px]'>{account.title}</td>
                                    <td>{formatMoney(account.amount)}</td>
                                </tr>
                                </Link>
                            )
                        })
                    }
                    {/* <AddNewAccountRow 
                        onClick={addAccountHandleClick}
                    /> */}
                    
                </tbody>
                        {/* <HighLightedContainer>
                            <TitleValuePair title={'Disponible'} textColor={'text-black'} value={totalsAccounts} />
                        </HighLightedContainer> */}
            </table>
            {/* { showAccountModal && (
                <AccountModal
                    setShowAccountModal={setShowAccountModal}
                    incomeCategories={incomesBudget}
                    accounts={userAccounts}
                    currentAccount={currentAccount}
                    setCurrentAccount={setCurrentAccount}
                    setAccounts={setUserAccounts}
                    typeOfAccountModal={typeOfAccountModal}
                />
            )} */}
        </>
    )
}

export default AccountsTable

