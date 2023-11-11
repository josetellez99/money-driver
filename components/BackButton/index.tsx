import React from 'react';
import {IoIosArrowBack} from 'react-icons/io';
import Link from 'next/link';
import { on } from 'events';

interface BackButtonProps {
    onClick?: React.MouseEventHandler<SVGElement>;
    href: string;
}

const BackButton: React.FC<BackButtonProps> = ({onClick, href}) => {

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        onClick && onClick(event as unknown as React.MouseEvent<SVGElement>)
    }

    return (
        <>
            <Link 
                href={href}
            >
                <IoIosArrowBack 
                    className='text-white cursor-pointer font-bold text-[30px] mb-4'
                />
            </Link>
            
        </>
    )
}

export default BackButton;