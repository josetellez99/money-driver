import React from "react"

interface RegisterBarProps {
    children: React.ReactNode
}

const RegisterBar: React.FC<RegisterBarProps> = ({ children }) => {
    return (
    <>
        <div className='bg-black h-[70px] w-full fixed bottom-0 left-0 right-0 flex justify-center items-center'>
            {children}
        </div>
    </>
    )
}

export default RegisterBar