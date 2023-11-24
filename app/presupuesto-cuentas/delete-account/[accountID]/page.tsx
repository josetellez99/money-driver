import { fetchSingleUserAccount, fetchUserAccounts } from '@/app/lib/action';

import DeleteForm from '@/components/AccountsTable/DeleteForm';
import MainDefault from '@/components/MainDefault';
import BackButton from '@/components/BackButton';

const EditAccountPage = async ({params} : {params : {
    accountID: string
}}) => {

    const { accountID } = params;

    const [userAccount, userAccounts] = await Promise.all([
        fetchSingleUserAccount(accountID),
        fetchUserAccounts()
    ]);

    return (
        <MainDefault>
            <div className="flex flex-col w-full">
                <div className='max-w-min'>
                    <BackButton href='/presupuesto-cuentas' />
                </div>
                <DeleteForm
                    userAccount={userAccount}
                    userAccounts={userAccounts}
                />
            </div>
        </MainDefault>
    )
}

export default EditAccountPage