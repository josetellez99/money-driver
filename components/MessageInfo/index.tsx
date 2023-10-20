import React from "react";

interface MessageInfoProps {
    message: string;
}

const MessageInfo: React.FC<MessageInfoProps> = ({message}) => {
    return (
        <>
            <div className='bg-green-400 rounded-lg p-1 mb-2 items-center w-full h-full'>
                <p className='text-center'>{message}</p>
            </div>
        </>
    )
}

export default MessageInfo