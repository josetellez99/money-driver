import React from 'react'
import BorderDiv from '@/components/BorderDiv';
import ElementTitle from '@/components/ElementTitle';
import TitleValuePair from '@/components/TitleValuePair';
import HighLightedContainer from '@/components/HighLightedContainer';

type CreditCardSummarydata = {
    CreditCardName: string,
    usedThisMonth: {
        title: string,
        amount: number
    },
    toPayThisMonth: {
        title: string,
        amount: number
    }
}

interface SummaryCreditCardProps {
    creditCardsData: CreditCardSummarydata[]
}

const SummaryCreditCard: React.FC<SummaryCreditCardProps> = ({creditCardsData}) => {

    const getTotalUsedToPayThisMonth = (data: SummaryCreditCardProps[]) => {

        let totals = []

        const totalUsed = data.reduce((total, creditCard) => {
            return total + creditCard.usedThisMonth.amount
        }, 0)
        totals.push(totalUsed)

        const totalToPay = data.reduce((total, creditCard) => {
            return total + creditCard.toPayThisMonth.amount
        }, 0)
        totals.push(totalToPay)

        return totals
    }

    const [totalUsed, totalToPay] = getTotalUsedToPayThisMonth(creditCardsData)

    return (
        <>
            <BorderDiv>
                <ElementTitle title={'Tarjetas de credito'} />
                        {
                            creditCardsData.map( creditCard => {
                                return ( 
                                    <>
                                        <div>
                                            <h3 className='font-bold'>{creditCard.CreditCardName}</h3>
                                        </div>
                                        <div className='flex justify-end mb-4'>
                                            <div className='flex flex-col items-end'>
                                                <TitleValuePair 
                                                    title={creditCard.usedThisMonth.title} 
                                                    value={creditCard.usedThisMonth.amount} 
                                                    />
                                                <TitleValuePair 
                                                    title={creditCard.toPayThisMonth.title} 
                                                    value={creditCard.toPayThisMonth.amount} 
                                                    />
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                <HighLightedContainer>
                    <TitleValuePair title={'Total usado este mes'} textColor={'text-black'} value={totalUsed} />
                </HighLightedContainer>
                <HighLightedContainer>
                    <TitleValuePair title={'Total a pagar este mes'} textColor={'text-black'} value={totalToPay} />
                </HighLightedContainer>
            </BorderDiv>
        </>
    )
}

export default SummaryCreditCard