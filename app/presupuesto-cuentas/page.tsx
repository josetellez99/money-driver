import React from 'react';
import AccountsTable from '@/components/AccountsTable';
import Budget from '@/components/Budget';
import MainDefault from '@/components/MainDefault';
import SummaryCreditCard from '@/components/SummaryCreditCard';

interface BudgetAccountPageProps {

}

// Where this "cuentas" should came from?
const accounts = [
    {
        id: 1,
        title: 'Cuenta de ahorros que madre flipas con la que estoy montando',
        amount: 2000500,
    },
    {
        id: 2,
        title: 'Efectivo',
        amount: 150500,
    },
    {
        id: 3,
        title: 'Daviplata',
        amount: 687500,
    }
]

const incomeBudget = [
    {
        id: 1,
        title: 'Salary',
        amount: 3000000,
        used: 1500000,
        remaining: 1500000,
        subcategories: undefined
    },
    {
        id: 2,
        title: 'Freelance Work',
        amount: 2000000,
        used: 500000,
        remaining: 1500000,
        subcategories: [
            {
                id: 1001,
                title: 'Upwork',
                amount: 1000000,
                used: 500000,
                remaining: 500000
            },
            {
                id: 1002,
                title: 'Fiverr',
                amount: 1000000,
                used: 0,
                remaining: 1000000
            }
        ]
    },
    {
        id: 3,
        title: 'Investments',
        amount: 1000000,
        used: 0,
        remaining: 1000000,
        subcategories: undefined

    },
    {
        id: 4,
        title: 'Rentals',
        amount: 500000,
        used: 250000,
        remaining: 250000,
        subcategories: undefined

    },
    {
        id: 5,
        title: 'Other Income',
        amount: 1000000,
        used: 500000,
        remaining: 500000,
        subcategories: undefined

    }
]

const expenseBudget = [
    {
        id: 6,
        title: 'Arriendo',
        amount: 480000,
        used: 480000,
        remaining: 0,
        subcategories: undefined
    },
    {
        id: 7,
        title: 'Comida',
        amount: 400000,
        used: 350000,
        remaining: 50000,
        subcategories: undefined
    },
    {
        id: 8,
        title: 'Ayuda a la familia',
        amount: 100000,
        used: 75000,
        remaining: 25000,
        subcategories: undefined
    },
    {
        id: 9,
        title: 'Personales',
        amount: 20000,
        used: 16000,
        remaining: 4000,
        subcategories: undefined
    },
    {
        id: 10,
        title: 'Moto',
        amount: 450000,
        used: 376200,
        remaining: 73800,
        subcategories: undefined
    },
    {
        id: 11,
        title: 'Otros',
        amount: 300000,
        used: 120000,
        remaining: 180000,
        subcategories: undefined
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
                <AccountsTable
                    accounts={accounts}
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
