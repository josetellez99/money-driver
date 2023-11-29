import React from 'react';
import MainDefault from '@/components/MainDefault';
import Link from 'next/link';
import SummaryTransactionList from '@/components/SummaryTransactionList';
import { fetchUserTransactions } from '@/app/lib/action';
import ElementTitle from '@/components/ElementTitle';
import DownBar from '@/components/DownBar'

const registerTypes = [
    {title: 'Todos', href: '/registros/todos'},
    {title: 'Ingreso', href: '/registros/ingreso', },
    {title: 'Egreso', href: '/registros/egreso', },
    {title: 'Movimiento', href: '/registros/movimiento', },
]

interface Props {
    params : {
        type: string
    }
}
const RegistersPage: React.FC<Props> = async ({params}) => {

    const typesInEnglish = {
        todos: 'all',
        ingreso: 'income',
        egreso: 'expense',
        movimiento: 'movement',
    }


    
    const transactions = await fetchUserTransactions(typesInEnglish[params.type], 10);

    return (
        <>
            <MainDefault
                paddingForDownBar={true}
            >
                <ElementTitle 
                    title='Tus transacciones'
                />
                <ul className='flex gap-2'>
                    {registerTypes.map( (registerType) => {

                        const isActive = params.type === registerType.title.toLocaleLowerCase();
                        const bgColor = isActive ? 'bg-greenYellow' : 'bg-mainGray';
                        const textColor = isActive ? 'text-black' : ''

                        return (
                            <li>
                                <Link 
                                    href={registerType.href}
                                    className={`${bgColor} ${textColor} flex justify-center items-center px-1 h-8 rounded cursor-pointer`}
                                >
                                    {registerType.title}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
                <SummaryTransactionList 
                    transactions={transactions} 
                />
            </MainDefault>
            <DownBar />
        </>
    );
};

export default RegistersPage;
