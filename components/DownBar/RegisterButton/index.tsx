'use client'

import React from 'react'
import { HiMiniPlus } from 'react-icons/hi2'

import PopUpLayer from '@/components/PopupLayer'
import RegisterOptionLinkList from '@/components/RegisterOptionLinkList'
import RegisterOptionLink from '@/components/RegisterOptionLink'


interface RegisterButtonProps {
    buttonsDataList: ButtonData[]
}

const RegisterButton: React.FC<RegisterButtonProps> = ({buttonsDataList}) => {

    const [open, setOpen] = React.useState<boolean>(false)

    const handleClick = () => {
        setOpen(state  => !state)
    }

    return (
        <>
        <button onClick={handleClick} className='h-[58px] w-[58px] bg-greenYellow rounded-full flex justify-center items-center'>
            {open ? (
                <HiMiniPlus className="text-[44px] text-black transform rotate-45 transition-transform duration-200" />
                ) : (
                <HiMiniPlus className="text-[44px] text-black transition-transform duration-200" />
            )}
        </button>

        { open && 
            <PopUpLayer bottom='bottom-[70px]'>
                <RegisterOptionLinkList>
                    {buttonsDataList.map( item => (
                        <RegisterOptionLink
                            key={item.id}
                            buttonData={item}
                            setPopUpState={setOpen}
                        />
                    ))}
                </RegisterOptionLinkList>
            </PopUpLayer>
        }

        </>
    )
}

export default RegisterButton
