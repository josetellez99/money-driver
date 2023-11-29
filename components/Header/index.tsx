import React from 'react';
import { HiOutlineMenu } from 'react-icons/hi'
import Link from 'next/link';
import { LiaMoneyBillWaveSolid } from 'react-icons/lia'

interface HeaderProps {
    nombre: string;
    userProfileURL: string;
}

export const Header: React.FC<HeaderProps> = () => {
    return (
        <>
            <header className='mb-8'>
                <nav className='px-3 py-2'>
                    <ul className='flex justify-between'>
                        <li>
                            <Link href={'/'}>
                                <LiaMoneyBillWaveSolid className={'text-[44px]'} />
                            </Link>
                        </li>
                        {/* <li className='flex align-middle'>
                            <HiOutlineMenu className={'text-[44px]'} />
                        </li> */}
                        {/* <li className='flex gap-4'>
                            <p className='flex flex-col'>
                                <span className='text-lg font-bold text-end'>Bienvenid@</span>
                                <span className='text-end'>{nombre}</span>
                            </p>
                            <figure>
                                <img src="" alt="" />
                                <div className='rounded-full bg-white h-[50px] w-[50px]'></div>
                            </figure>
                        </li> */}
                    </ul>
                </nav>
            </header>
        </>
    )
}