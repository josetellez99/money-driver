'use client'

import React, { MouseEvent} from 'react'

interface RegularButtonProps {
    buttonData: ButtonData,
    className?: string
    isActive?: boolean,
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const RegularButton: React.FC<RegularButtonProps> = ({buttonData, className, isActive, onClick }) => {

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        onClick && onClick(event)

    }

    const activeClass = isActive ? 'bg-greenYellow text-black' : 'bg-darkBlue text-white'

    return (
        <>
            <li>
                <button onClick={handleClick} className={`${activeClass} min-w-[80px]  border-white border-2 mr-2 rounded-md px-2 py-1  ${className}`}>
                    {buttonData.title}
                </button>
            </li>
        </>
    )
}

export default RegularButton