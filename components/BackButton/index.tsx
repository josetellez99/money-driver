import React from 'react';
import {IoIosArrowBack} from 'react-icons/io';

interface BackButtonProps {
    onClick?: React.MouseEventHandler<SVGElement>;
}

const BackButton: React.FC<BackButtonProps> = ({onClick}) => {

    const handleClick = (event: React.MouseEvent<SVGElement>) => {
        event.preventDefault()
        onClick && onClick(event)
    }

    return (
        <>
            <IoIosArrowBack 
                onClick={handleClick}
                className='text-white cursor-pointer font-bold text-[30px] mb-4'
            />
        </>
    )
}

export default BackButton;