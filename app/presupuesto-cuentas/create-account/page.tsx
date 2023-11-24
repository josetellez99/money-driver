import { fetchUserBudget, fetchUserAccounts } from '@/app/lib/action';

import MainDefault from '@/components/MainDefault';
import BackButton from '@/components/BackButton';

import CreateForm from '@/components/AccountsTable/CreateForm';

const CreateAccountPage = async () => {

    const [userAccounts, userBudgetIncome] = await Promise.all([
        fetchUserAccounts(),
        fetchUserBudget('income'),
    ]);

    return (
        <MainDefault>
            <div className="flex flex-col w-full">
                <div className='max-w-min'>
                    <BackButton href='/presupuesto-cuentas' />
                </div>
                <CreateForm
                    userAccounts={userAccounts}
                    incomeCategories={userBudgetIncome}
                />
            </div>
        </MainDefault>
    )
}

export default CreateAccountPage