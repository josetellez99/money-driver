import { fetchUserAccounts, fetchUserBudgetIncomes } from '@/app/lib/action';

import EditForm from '@/components/AccountsTable/EditForm';
import MainDefault from '@/components/MainDefault';
import BackButton from '@/components/BackButton';

const myUserId = '4f968b8e-0790-488f-8ee9-4ed06509954e'

const EditAccountPage = async ({params} : {params : {
    accountID: string
}}) => {

    const { accountID } = params;

    const [userAccounts, incomeBudget] = await Promise.all([
        fetchUserAccounts(),
        fetchUserBudgetIncomes()
    ]);

    return (
        <MainDefault>
            <div className="flex flex-col w-full">
                <BackButton href='/presupuesto-cuentas' />
                <EditForm
                    incomeCategories={incomeBudget}
                    userAccounts={userAccounts}
                    currentAccountID={accountID}
                />
            </div>
        </MainDefault>
    )
}

export default EditAccountPage