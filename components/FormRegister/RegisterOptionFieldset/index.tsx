import React from "react"

import RegisterOptionCheckbox from "@/components/FormRegister/RegisterOptionCheckbox"


interface FieldsetFormProps {
    registerOptions: ButtonData[] 
    activeRegisterOption: string,
    setActiveRegisterOption: React.Dispatch<React.SetStateAction<string>>

}

const RegisterOptionFieldset: React.FC<FieldsetFormProps> = ({ registerOptions, activeRegisterOption, setActiveRegisterOption}) => {

    return (
        <>
            <fieldset className="flex gap-2 flex-wrap justify-center">

            {registerOptions.map( (item, index) => (
                <RegisterOptionCheckbox
                    key={index}
                    buttonData={item}
                    setActiveRegisterOption={setActiveRegisterOption}
                    isActive={activeRegisterOption === item.title}
                />
            ))}
                
            </fieldset>
        </>
    )
}

export default RegisterOptionFieldset