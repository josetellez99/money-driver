import React from "react"
import RegisterButton from '@/components/DownBar/RegisterButton'

interface RegisterBarProps {
}

const RegisterBar: React.FC<RegisterBarProps> = ({  }) => {
    return (
    <>
        <div className='bg-black h-[70px] w-full fixed bottom-0 left-0 right-0 flex justify-center items-center'>
            <RegisterButton/>
        </div>
    </>
    )
}

export default RegisterBar