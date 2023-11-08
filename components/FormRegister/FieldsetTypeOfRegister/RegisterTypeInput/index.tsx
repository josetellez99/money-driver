import React from "react"

interface RegisterTypeInputProps {
    buttonData: ButtonData,
    isActive: boolean
    onClick?: (title: string) => void
}

const RegisterTypeInput: React.FC<RegisterTypeInputProps> = ({ 
    buttonData, 
    isActive,
    onClick
}) => {

    const handleChange = (title: string) => {
        onClick && onClick(title)
    }

    const bgColor = isActive ? 'bg-greenYellow' : 'bg-mainGray';
    const textColor = isActive ? 'text-black' : ''

    return (
        <>
            <label htmlFor={`register-option-${buttonData.title}`} className={`${bgColor} ${textColor} flex justify-center items-center px-1 h-8 rounded cursor-pointer`}>
                <p>{buttonData.title}</p>
                {
                    isActive ? (
                        <input 
                            type="checkbox" 
                            name={'register-option-checkbox'} 
                            checked
                            hidden
                            onChange={() => handleChange(buttonData.title)} 
                            id={`register-option-${buttonData.title}`} 
                        />
                    ) : (
                        <input 
                            type="checkbox" 
                            name={'register-option-checkbox'} 
                            checked={false}
                            hidden
                            onChange={() => handleChange(buttonData.title)} 
                            id={`register-option-${buttonData.title}`} 
                        />
                    )
                }
            </label>
        </>
    )
}

export default RegisterTypeInput