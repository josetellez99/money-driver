import React from 'react'

interface SubmitButtonProps {
    title: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({title}) => {
    return (
        <>
            <input 
                type="submit"
                value={title}
                className="w-full mt-2 h-[36px] rounded bg-greenYellow text-center font-bold text-black cursor-pointer"
            />
        </>
    )
}

export default SubmitButton