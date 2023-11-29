import React from 'react';
import AccountsTable from '@/components/AccountsTable';
import Budget from '@/components/Budget';
import MainDefault from '@/components/MainDefault';
import CreditCardTable from '@/components/CreditCardTable';
import ConfirmationMessage from '@/components/ConfirmationMessage';
import { cookies } from 'next/headers'
import DownBar from '@/components/DownBar'



const BudgetAccountPage: React.FC = async () => {

    const cookieStore = cookies()
    const showConfirmationMessage = cookieStore.get('showConfirmationMessage')

    return (
        <>
            <MainDefault
                paddingForDownBar={true}
            >
                { showConfirmationMessage && showConfirmationMessage?.value !== 'Error' && (
                    <ConfirmationMessage
                        message={showConfirmationMessage?.value!}
                        type='success'
                    />
                )}
                { showConfirmationMessage && showConfirmationMessage?.value === 'Error' && (
                    <ConfirmationMessage
                        message='Hubo un error, por favor vuelve a intentarlo'
                        type='error'
                    />
                )}
                <AccountsTable />
                <Budget
                    title={'Presupuesto de ingresos'}
                    type='income'
                />
                <Budget
                    title={'Presupuesto de gastos'}
                    type='expense'
                />
                {/* <CreditCardTable 
                    userCreditsCards={creditCardsData}
                /> */}
            </MainDefault>
            <DownBar />
        </>
    );
};

export default BudgetAccountPage;