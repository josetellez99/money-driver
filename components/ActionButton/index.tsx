import { IoIosAdd } from 'react-icons/io';
import { AiOutlineSetting } from 'react-icons/ai';
import { BiX } from 'react-icons/bi';
import React from 'react';
import { on } from 'events';

interface ActionButtonProps {
    title: string,
    type: 'add' | 'edit' | 'delete',
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ActionButton: React.FC<ActionButtonProps> = ({title, type, onClick}) => {

    let iconToRender;

    if(type === 'add') {
        iconToRender = <IoIosAdd className={'text-black font-bold text-[30px]'} />
    } else if(type === 'edit') {
        iconToRender = <AiOutlineSetting className={'text-black font-bold text-[18px]'} />
    } else if(type === 'delete') {
        iconToRender = <BiX className={'text-black font-bold text-[30px]'} />
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        onClick && onClick(event)
    }

    return (
        <>
            <button onClick={handleClick} className='flex items-center gap-1 my-1'>
                    <figure className='flex justify-center items-center h-6 w-6 bg-greenYellow rounded-full'>
                        {iconToRender}
                    </figure>
                    <span className='text-sm'>{title}</span>
            </button>
        </>
    );
}

export default ActionButton;