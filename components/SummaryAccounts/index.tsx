'use client'

import BorderDiv from '@/components/BorderDiv';
import ElementTitle from '@/components/ElementTitle';
import TitleValuePair from '@/components/TitleValuePair';
import HighLightedContainer from '@/components/HighLightedContainer';
import ActionButton from '@/components/ActionButton';

interface AccountsSummaryProps {
    accounts: PairValue[]
}

const AccountsSummary: React.FC<AccountsSummaryProps> = ({accounts}) => {

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log('clicked from the accounts summary');
    }

    return (
        <>
            <BorderDiv>
                    <ElementTitle title={'Cuentas'} />
                    <div className='relative flex justify-end'>
                        <div className='w-[70%] justify-self-end mb-3 gap-1'> 
                            {
                                accounts.map( cuenta => {
                                    return <TitleValuePair title={cuenta.title} value={cuenta.value} />
                                })
                            }
                        </div>
                    </div>
                    <HighLightedContainer>
                        <TitleValuePair title={'Disponible'} textColor={'text-black'} value={2000500 + 150500 + 687500} />
                    </HighLightedContainer>
                    <ActionButton 
                        title={'Agregar Cuenta'}
                        type={'add'}
                        onClick={handleClick}
                        // handleClick={5}
                    />
                </BorderDiv>
        </>
    )
}

export default AccountsSummary