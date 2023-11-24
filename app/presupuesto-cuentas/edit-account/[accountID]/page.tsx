import { fetchUserAccounts, fetchUserBudget } from '@/app/lib/action';

import EditForm from '@/components/AccountsTable/EditForm';
import MainDefault from '@/components/MainDefault';
import BackButton from '@/components/BackButton';

const EditAccountPage = async ({params} : {params : {
    accountID: string
}}) => {

    const { accountID } = params;

    const [userAccounts, incomeBudget] = await Promise.all([
        fetchUserAccounts(),
        fetchUserBudget('income')
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