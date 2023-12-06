import React from 'react';

import ElementTitle from '@/components/ElementTitle';
import TitleValuePair from '@/components/TitleValuePair';
import HighLightedContainer from '@/components/HighLightedContainer';
import formatMoney from '@/utils/formatMoney';
import AddNewAccountRow from '@/components/AccountsTable/AddNewAccountRow';
import { fetchUserAccounts } from '@/app/lib/action';
import Link from 'next/link';
import { unstable_noStore as noStore } from 'next/cache';

const AccountsTable: React.FC = async () => {
    noStore();

    const userAccounts = await fetchUserAccounts()

    const totalsAccounts = userAccounts.reduce((acc, account) => {
        return acc + account.amount!;
    }, 0);

    return (
        <>
            <ElementTitle title={'Tus cuentas'} />
            <table className='block w-full mb-10'>
                <thead className='block w-full'>
                    <tr className='flex justify-between mb-2 px-2'>
                        <th>Nombre de la cuenta</th>
                        <th>Saldo</th>
                    </tr>
                </thead>
                <tbody className='block w-full'>
                    {
                        userAccounts.map( account => (
                                <tr 
                                    key={account.id}
                                    className='flex justify-between border border-greenYellow rounded-lg p-1 px-2 mb-2 w-full cursor-pointer'
                                >
                                    <Link
                                        href={`/presupuesto-cuentas/edit-account/${account.id}`}
                                        key={account.id}
                                        className='flex justify-between w-full'
                                    >
                                        <td className='truncate max-w-[230px]'>{account.title}</td>
                                        <td>{formatMoney(account.amount)}</td>
                                    </Link>
                                </tr>
                            ))
                    }
                    <AddNewAccountRow
                        href={'/presupuesto-cuentas/create-account'}
                    />
                    <HighLightedContainer inTable={true}>
                        <TitleValuePair title={'Disponible'} textColor={'text-black'} value={totalsAccounts} />
                    </HighLightedContainer>
                </tbody>
            </table>
        </>
    )
}

export default AccountsTable

