import React from 'react';
import AccountsTable from '@/components/AccountsTable';
import Budget from '@/components/Budget';
import MainDefault from '@/components/MainDefault';
import CreditCardTable from '@/components/CreditCardTable';

const BudgetAccountPage: React.FC = async () => {
    return (
        <>
            <MainDefault>
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
        </>
    );
};

export default BudgetAccountPage;