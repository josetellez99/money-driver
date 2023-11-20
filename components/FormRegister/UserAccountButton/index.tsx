import React from "react"

import formatMoney from "@/utils/formatMoney"

interface UserAccountButtonProps {
    buttonData: UserAccount | BudgetItem,
    isActive: boolean,
    onClick?: React.MouseEventHandler<HTMLInputElement>
    accountType?: string
}

const UserAccountButton: React.FC<UserAccountButtonProps> = ({buttonData, isActive, onClick, accountType}) => {

    const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
        onClick && onClick(event)
    }

    const activeStyles = isActive ? 'bg-greenYellow' : 'bg-darkBlue';

    return (
        <>
            <label htmlFor={`${accountType}-${buttonData.title}`} className={`flex items-center flex-col min-w-min cursor-pointer`}>
                <figure className={`flex justify-center items-center h-[50px] w-[50px]  ${activeStyles}  border border-white rounded-full`}>
                </figure>
                <p className="text-center text-sm mb-1">{buttonData.title}</p>

                {/* This validation is to show the amount just for the account instead budget categories */}
                {/* { buttonData.amount && <p className="text-sm">{formatMoney(buttonData.amount)}</p>} */}
                
                { isActive ? (
                    <input 
                        type="checkbox" 
                        checked
                        hidden
                        onClick={handleClick}
                        name={accountType} 
                        id={`${accountType}-${buttonData.title}`} 
                    />
                ) : (
                    <input 
                        type="checkbox" 
                        checked={false}
                        hidden
                        onClick={handleClick}
                        name={accountType} 
                        id={`${accountType}-${buttonData.title}`} 
                    />
                )}
            </label>
        </>
    )
}

export default UserAccountButton