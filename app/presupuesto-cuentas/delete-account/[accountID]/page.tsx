import { fetchSingleUserAccount, fetchUserAccounts } from '@/app/lib/action';

import DeleteForm from '@/components/AccountsTable/DeleteForm';
import MainDefault from '@/components/MainDefault';
import BackButton from '@/components/BackButton';

const myUserId = '4f968b8e-0790-488f-8ee9-4ed06509954e'

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