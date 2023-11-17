import { fetchSingleUserAccount, fetchUserAccounts } from '@/app/lib/action';

import DeleteForm from '@/components/AccountsTable/DeleteForm';
import MainDefault from '@/components/MainDefault';
import BackButton from '@/components/BackButton';

const EditAccountPage = async ({params} : {params : {
    accountID: string
}}) => {

    const { accountID } = params;
    const userAccount = await fetchSingleUserAccount(accountID)
    const userAccounts = await fetchUserAccounts()

    return (
        <MainDefault>
            <div className="flex flex-col w-full">
                <div className='max-w-min'>
                    <BackButton href='/presupuesto-cuentas' />
                </div>
                <DeleteForm
                    userAccount={userAccount}
                    userAccounts={userAccounts}
                    currentAccountID={accountID}
                />
            </div>
        </MainDefault>
    )
}

export default EditAccountPage