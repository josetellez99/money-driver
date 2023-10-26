import React from "react"

import formatMoney from "@/utils/formatMoney"

interface UserAccountButtonProps {
    buttonData: UserAccount,
    isActive: boolean,
    onClick?: React.MouseEventHandler<HTMLInputElement>
}

const UserAccountButton: React.FC<UserAccountButtonProps> = ({buttonData, isActive, onClick}) => {

    const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
        console.log('clicked')
        onClick && onClick(event)
    }

    const activeStyles = isActive ? 'bg-greenYellow' : 'bg-darkBlue';

    return (
        <>
            <label htmlFor={`account-${buttonData.title}`} className={`flex items-center flex-col cursor-pointer`}>
                <figure className={`h-[50px] w-[50px]  ${activeStyles}  border border-white rounded-full`}>
                </figure>
                <p className="text-center text-sm mb-1">{buttonData.title}</p>
                <p className="text-sm">{formatMoney(buttonData.amount)}</p>
                {
                    isActive ? (
                        <input 
                            type="checkbox" 
                            checked
                            hidden
                            onClick={handleClick}
                            name="user-accounts" 
                            id={`account-${buttonData.title}`} 
                        />
                    ) : (
                        <input 
                            type="checkbox" 
                            checked={false}
                            hidden
                            onClick={handleClick}
                            name="user-accounts" 
                            id={`account-${buttonData.title}`} 
                        />
                    )
                }
            </label>
        </>
    )
}

export default UserAccountButton