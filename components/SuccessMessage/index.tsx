'use client'

import React from 'react'

interface SuccessMessageProps {
    message: string;
    setShowSuccessMessage: React.Dispatch<React.SetStateAction<boolean>>;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({message, setShowSuccessMessage}) => {



    return (
        <div className="absolute top-1 left-1 right-1 flex justify-between bg-green-400 px-2 py-3 rounded z-10">
            <p>{message}</p>
            <div className='flex justify-end'>
                <button onClick={() => setShowSuccessMessage(false)}>x</button>
            </div>
        </div>
    )
}

export default SuccessMessage