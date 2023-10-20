import React from "react"

interface RegisterOptionCheckboxProps {
    buttonData: ButtonData,
    setActiveRegisterOption: any,
    isActive: boolean
}

const RegisterOptionCheckbox: React.FC<RegisterOptionCheckboxProps> = ({ buttonData, setActiveRegisterOption, isActive }) => {

    const handleChange = (title: string) => {
        setActiveRegisterOption(title)
    }

    //onClick={(event) => handleClick(event, data.title)}

    const bgColor = isActive ? 'bg-greenYellow' : 'bg-mainGray';
    const textColor = isActive ? 'text-black' : ''

    return (
        <>
            <label htmlFor={`register-option-${buttonData.title}`} className={`${bgColor} ${textColor} flex justify-center items-center max-w-min px-2 h-8 rounded cursor-pointer`}>
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

export default RegisterOptionCheckbox