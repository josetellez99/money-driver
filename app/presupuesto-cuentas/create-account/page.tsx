import { fetchUserBudgetIncomes, fetchUserAccounts } from '@/app/lib/action';

import MainDefault from '@/components/MainDefault';
import BackButton from '@/components/BackButton';

import CreateForm from '@/components/AccountsTable/CreateForm';

const myUserId = '4f968b8e-0790-488f-8ee9-4ed06509954e'

const CreateAccountPage = async () => {



    const [userAccounts, userBudgetIncome] = await Promise.all([
        fetchUserAccounts(),
        fetchUserBudgetIncomes()
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