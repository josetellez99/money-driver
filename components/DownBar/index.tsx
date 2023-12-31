import React from "react"
import RegisterButton from '@/components/DownBar/RegisterButton'
import ButtonRecorder from "./ButtonRecorder"

interface RegisterBarProps {
}

const RegisterBar: React.FC<RegisterBarProps> = ({  }) => {
    return (
    <>
        <div className='bg-black h-[70px] z-10 w-full fixed bottom-0 left-0 right-0 flex justify-center gap-3 items-center'>
            <RegisterButton/>
            <ButtonRecorder/>
        </div>
    </>
    )
}

export default RegisterBar