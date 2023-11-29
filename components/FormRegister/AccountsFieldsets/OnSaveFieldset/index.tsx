import React from 'react'
import ElementTitle from '@/components/ElementTitle'

interface OnSaveFieldsetProps {

}

const OnSaveFieldset: React.FC<OnSaveFieldsetProps> = ({

}) => {

    return (
        <>
            <div className='bg-green-500 text-black p-2 rounded text-center'>
                <ElementTitle title='This section is comming soon, youll be able to handle your savings easily' />
            </div>
        </>
    )
}

export default OnSaveFieldset