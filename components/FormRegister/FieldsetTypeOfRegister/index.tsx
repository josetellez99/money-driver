import React from "react"

import FieldsetBase from "@/components/FormRegister/FieldsetBase"
import RegisterTypeInput from "@/components/FormRegister/FieldsetTypeOfRegister/RegisterTypeInput"

interface FieldsetFormProps {
    currentTransaction: Transaction,
    setCurrentTransaction: React.Dispatch<React.SetStateAction<Transaction>>,
    typesOfRegister: ButtonData[]
}

const RegisterOptionFieldset: React.FC<FieldsetFormProps> = ({ 
    currentTransaction,
    setCurrentTransaction,
    typesOfRegister
}) => {

    const onClick = (title: string) => {
        setCurrentTransaction({
            ...currentTransaction,
            type: title
        })
    }

    return (
        <FieldsetBase
            className="justify-center"
        >
            {typesOfRegister.map( (registerType) => (
                <RegisterTypeInput
                    key={registerType.title}
                    buttonData={registerType}
                    isActive={currentTransaction.type === registerType.title}
                    onClick={onClick}
                />
            ))}    
        </FieldsetBase>
    )
}

export default RegisterOptionFieldset