import { fetchUserAccounts, fetchUserBudgetIncome } from '@/app/lib/action';
import AccountModal from '@/components/AccountsTable/AccountModal';

const myUserId = '4f968b8e-0790-488f-8ee9-4ed06509954e'

const EditAccountPage = async ({params} : {params : string}) => {

    const [userAccounts, incomeBudget] = await Promise.all([
        fetchUserAccounts(myUserId),
        fetchUserBudgetIncome(myUserId)
    ]);

    return (
        <div>
        <h1>Edit Account Page</h1>
        </div>
    )
}

export default EditAccountPage