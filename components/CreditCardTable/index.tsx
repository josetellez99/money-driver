'use client'

import React from 'react'
import ElementTitle from '@/components/ElementTitle';
import TitleValuePair from '@/components/TitleValuePair';
import HighLightedContainer from '@/components/HighLightedContainer';
import AddNewCreditCardRow from '@/components/CreditCardTable/AddNewCreditCardRow';

import formatMoney from '@/utils/formatMoney';

interface CreditCardTableProps {
    userCreditsCards: CreditCardData[]
}

const CreditCardTable: React.FC<CreditCardTableProps> = ({userCreditsCards}) => {

    const[showCreditCardModal, setShowCreditCardModal] = React.useState<boolean>(false);
    const[typeOfCreditCardModal, setTypeOfCreditCardModal] = React.useState<'create' | 'edit' | 'delete'>('create');
    const[creditsCardData, setCreditsCardData] = React.useState<CreditCardData[]>(userCreditsCards);
    const[currentCreditCard, setCurrentCreditCard] = React.useState<CreditCardData>();

    const getCreditCardTotalUsed = (creditsCardData: CreditCardData[]) => {

        const totalUsed = creditsCardData.reduce((total, creditCard) => {
            return total + creditCard.used
        }, 0)     

        return totalUsed
    }
    const totalUsed = getCreditCardTotalUsed(creditsCardData);

    const rowHandleClick = (creditCardata: CreditCardData) => {
        setShowCreditCardModal(true);
        setTypeOfCreditCardModal('edit');
        setCurrentCreditCard(creditCardata);
    }

    const AddNewCreditCardHandelClick = () => {
        setShowCreditCardModal(true);        
        setTypeOfCreditCardModal('create');
        setCurrentCreditCard({
            id: Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000,
            title: '',
            used: 0,
        });

    }

    return (
        <>
            <ElementTitle title={'Tarjetas de credito'} />
            <table className='block'>
                <thead className='block mb-2'>
                    <tr className='flex justify-between'>
                        <td>Tarjeta de credito</td>
                        <td>Usado este mes</td>
                    </tr>
                </thead>
                <tbody className='block'>
                    { creditsCardData.map( creditCardData => {
                            return (
                                <tr 
                                    key={creditCardData.id}
                                    onClick={() => rowHandleClick(creditCardData)} 
                                    className='flex justify-between border border-greenYellow rounded-lg p-1 px-2 mb-2 w-full cursor-pointer'
                                >
                                    <td className='truncate max-w-[170px]'>{creditCardData.title}</td>
                                    <td>{formatMoney(creditCardData.used)}</td>
                                </tr>
                            )
                        })}
                    <AddNewCreditCardRow 
                        onClick={AddNewCreditCardHandelClick} 
                    />
                </tbody>
            </table>
            <HighLightedContainer>
                <TitleValuePair title={'Total usado este mes'} textColor={'text-black'} value={totalUsed} />
            </HighLightedContainer>
        </>
    )
}

export default CreditCardTable

