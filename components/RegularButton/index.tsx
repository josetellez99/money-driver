'use client'

import React, { MouseEvent, MouseEventHandler} from 'react'

interface RegularButtonProps {
    title: string,
    className?: string
    isActive?: boolean,
    setActive?: React.Dispatch<React.SetStateAction<string>>
    onClick?: MouseEventHandler<HTMLButtonElement>
}

const RegularButton: React.FC<RegularButtonProps> = ({title, className, isActive, setActive, onClick }) => {

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        setActive && setActive(title)
        onClick && onClick(event)

    }

    const activeClass = isActive ? 'bg-greenYellow text-black' : 'bg-darkBlue text-white'

    return (
        <>
            <li>
                <button onClick={handleClick} className={`${activeClass} min-w-[80px]  border-white border-2 mr-2 rounded-md px-2 py-1  ${className}`}>
                    {title}
                </button>
            </li>
        </>
    )
}

export default RegularButton