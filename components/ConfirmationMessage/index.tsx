'use client'

import React, { useEffect, useState } from 'react';

interface ConfirmationMessageProps {
    message: string;
    type: string;
    setConfirmationMessage?: React.Dispatch<React.SetStateAction<{
        show: boolean;
        type: string;
        message: string;
    }>>;
}

const ConfirmationMessage: React.FC<ConfirmationMessageProps> = ({ message, type, setConfirmationMessage }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
        const timer = setTimeout(() => {
            setVisible(false);
        }, 2500);

        if(setConfirmationMessage) {
            setTimeout(() => {
                setConfirmationMessage({
                    show: false,
                    type: '',
                    message: ''
                });
            }, 3500)
        }

        return () => clearTimeout(timer);
    }, [setConfirmationMessage]);

    const stylesType = type === 'success' ? 'bg-green-500' : 'bg-red-500';

    return (
        <div className={`flex items-center justify-center fixed top-2 left-2 right-2 p-2 text-black font-bold text-center rounded-md transition-opacity duration-500 ease-in-out pointer-events-none ${stylesType} ${visible ? 'opacity-100' : 'opacity-0'}`}>
            {message}
        </div>
    );
};

export default ConfirmationMessage;