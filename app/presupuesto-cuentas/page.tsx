import React from 'react';
import AccountsSummary from '@/components/SummaryAccounts';
import Budget from '@/components/Budget';
import MainDefault from '@/components/MainDefault';
import SummaryCreditCard from '@/components/SummaryCreditCard';

interface BudgetAccountPageProps {

}

// Where this "cuentas" should came from?
const cuentas = [
    {
        title: 'Cuenta de ahorros que madre flipas con la que estoy montando',
        value: 2000500,
    },
    {
        title: 'Efectivo',
        value: 150500,
    },
    {
        title: 'Daviplata',
        value: 687500,
    }
]

const incomeBudget = [
    {
        id: 1,
        category: 'Salary',
        amount: 3000000,
        used: 1500000,
        remaining: 1500000
    },
    {
        id: 2,
        category: 'Freelance Work',
        amount: 2000000,
        used: 500000,
        remaining: 1500000,
        subcategories: [
            {
                id: 1001,
                category: 'Upwork',
                amount: 1000000,
                used: 500000,
                remaining: 500000
            },
            {
                id: 1002,
                category: 'Fiverr',
                amount: 1000000,
                used: 0,
                remaining: 1000000
            }
        ]
    },
    {
        id: 3,
        category: 'Investments',
        amount: 1000000,
        used: 0,
        remaining: 1000000
    },
    {
        id: 4,
        category: 'Rentals',
        amount: 500000,
        used: 250000,
        remaining: 250000
    },
    {
        id: 5,
        category: 'Other Income',
        amount: 1000000,
        used: 500000,
        remaining: 500000
    }
]

const expenseBudget = [
    {
        id: 6,
        category: 'Arriendo',
        amount: 480000,
        used: 480000,
        remaining: 0
    },
    {
        id: 7,
        category: 'Comida',
        amount: 400000,
        used: 350000,
        remaining: 50000
    },
    {
        id: 8,
        category: 'Ayuda a la familia',
        amount: 100000,
        used: 75000,
        remaining: 25000
    },
    {
        id: 9,
        category: 'Personales',
        amount: 20000,
        used: 16000,
        remaining: 4000
    },
    {
        id: 10,
        category: 'Moto',
        amount: 450000,
        used: 376200,
        remaining: 73800
    },
    {
        id: 11,
        category: 'Otros',
        amount: 300000,
        used: 120000,
        remaining: 180000
    },
]

const creditCardsData = [
    {
        CreditCardName: 'Rappicard',
        usedThisMonth: {
            title: 'Usado este mes',
            amount: 1785400, // This data about pay could came from the transaction list filtering and calculating it
        },
        toPayThisMonth: {
            title: 'Por pagar este mes',
            amount: 1785400,
        }
    },
    {
        CreditCardName: 'Bancolombia platino',
        usedThisMonth: {
            title: 'Usado este mes',
            amount: 200000,
        },
        toPayThisMonth: {
            title: 'Por pagar este mes',
            amount: 200000,
        }
    },
    {
        CreditCardName: 'Davivienda zero',
        usedThisMonth: {
            title: 'Usado este mes',
            amount: 50000,
        },
        toPayThisMonth: {
            title: 'Por pagar este mes',
            amount: 50000,
        }
    },
]

const BudgetAccountPage: React.FC<BudgetAccountPageProps> = () => {

    return (
        <>
            <MainDefault>
                <AccountsSummary
                    accounts={cuentas}
                />
                <Budget
                    userBudget={incomeBudget}
                    title={'Presupuesto de ingresos'}
                    type='incomes'
                />
                <Budget
                    userBudget={expenseBudget}
                    title={'Presupuesto de gastos'}
                    type='expenses'
                />
                <SummaryCreditCard 
                    creditCardsData={creditCardsData}
                />
            </MainDefault>
        </>
    );
};

export default BudgetAccountPage;
