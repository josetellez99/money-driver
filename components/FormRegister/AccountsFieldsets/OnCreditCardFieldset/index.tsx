import React from 'react'
import ElementTitle from '@/components/ElementTitle'

interface OnCreditCardFieldsetProps {

}

const OnCreditCardFieldset: React.FC<OnCreditCardFieldsetProps> = ({

}) => {

    return (
        <>
            <div className='bg-green-500 text-black p-2 rounded text-center'>
                <ElementTitle title='This section is comming soon, youll be able to add your credit card as a pay method, got ordered all transactions and register when you pay your credit card' />
            </div>
        </>
    )
}

export default OnCreditCardFieldset