import React from "react"

interface UserAccountButtonProps {
    buttonsData: ButtonData
    isActive: boolean,
    setAccount: React.Dispatch<React.SetStateAction<string | undefined>>,
}

const UserAccountButton: React.FC<UserAccountButtonProps> = ({buttonsData, isActive, setAccount}) => {

    const handleChange = (title: string) => {
        setAccount(title)
    }

    const activeStyles = isActive ? 'bg-greenYellow' : 'bg-darkBlue';

    return (
        <>
            <label htmlFor={`account-${buttonsData.title}`} className={`flex items-center flex-col cursor-pointer`}>
                <figure className={`h-[50px] w-[50px]  ${activeStyles}  border border-white rounded-full`}>
                </figure>
                <p className="text-center text-sm">{buttonsData.title}</p>
                {
                    isActive ? (
                        <input 
                            type="checkbox" 
                            checked
                            hidden
                            onChange={() => handleChange(buttonsData.title)}
                            name="user-accounts" 
                            id={`account-${buttonsData.title}`} 
                        />
                    ) : (
                        <input 
                            type="checkbox" 
                            checked={false}
                            hidden
                            onChange={() => handleChange(buttonsData.title)}
                            name="user-accounts" 
                            id={`account-${buttonsData.title}`} 
                        />
                    )
                }
            </label>
        </>
    )
}

export default UserAccountButton