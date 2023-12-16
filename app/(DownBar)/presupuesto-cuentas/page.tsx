import React from 'react';
import AccountsTable from '@/components/AccountsTable';
import Budget from '@/components/Budget';
import SectionDefault from '@/components/SectionDefault';
import CreditCardTable from '@/components/CreditCardTable';
import ConfirmationMessage from '@/components/ConfirmationMessage';
import { cookies } from 'next/headers'



const BudgetAccountPage: React.FC = async () => {

    const cookieStore = cookies()
    const showConfirmationMessage = cookieStore.get('showConfirmationMessage')

    return (
        <>
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
                <SectionDefault>
                    <AccountsTable />
                </SectionDefault>
                <SectionDefault>
                    <Budget
                        title={'Presupuesto de ingresos'}
                        type='income'
                    />
                </SectionDefault>
                <SectionDefault>
                    <Budget
                        title={'Presupuesto de gastos'}
                        type='expense'
                    />
                </SectionDefault>
                {/* <CreditCardTable 
                    userCreditsCards={creditCardsData}
                /> */}
        </>
    );
};

export default BudgetAccountPage;