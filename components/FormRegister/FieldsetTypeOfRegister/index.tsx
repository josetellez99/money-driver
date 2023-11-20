import React from "react"

import FieldsetBase from "@/components/FormRegister/FieldsetBase"
import { useRouter } from 'next/navigation'


const registerOptions = [
    { title: 'Ingreso', titleInEnglish: 'income'},
    { title: 'Egreso', titleInEnglish: 'expense'},
    { title: 'Movimiento', titleInEnglish: 'movement'},
    // { title: 'Ahorro', titleInEnglish: 'saving'},
    { title: 'Deuda', titleInEnglish: 'debt'},
    { title: 'Tarjeta de credito', titleInEnglish: 'creditCard'},
]

interface FieldsetFormProps {
    currentTransaction: Transaction,
    setCurrentTransaction: React.Dispatch<React.SetStateAction<Transaction>>,
}

const RegisterOptionFieldset: React.FC<FieldsetFormProps> = ({ 
    currentTransaction,
    setCurrentTransaction,
}) => {

    const router = useRouter();

    const changeUrl = (newUrl: string) => {
        router.push(newUrl, undefined);
    }

    const handleChange = (titleInEnglish: string, title: string) => {
        setCurrentTransaction({
            ...currentTransaction,
            type: titleInEnglish
        })
        changeUrl(`/registrar/${title}`)
    }

    return (
        <FieldsetBase
            className="justify-center"
        >
            {registerOptions.map( (registerType) => {

                const isActive = currentTransaction.type === registerType.titleInEnglish;
                const bgColor = isActive ? 'bg-greenYellow' : 'bg-mainGray';
                const textColor = isActive ? 'text-black' : ''
                
                return (
                    <label htmlFor={`register-${registerType.title}`} className={`${bgColor} ${textColor} flex justify-center items-center px-1 h-8 rounded cursor-pointer`}>
                        <p>{registerType.title}</p>
                        {
                            isActive ? (
                                <input 
                                    type="checkbox" 
                                    name={'register-option-checkbox'} 
                                    checked
                                    hidden
                                    onChange={() => handleChange(registerType.titleInEnglish, registerType.title)} 
                                    id={`register-${registerType.title}`} 
                                />
                            ) : (
                                <input 
                                    type="checkbox" 
                                    name={'register-option-checkbox'} 
                                    checked={false}
                                    hidden
                                    onChange={() => handleChange(registerType.titleInEnglish, registerType.title)} 
                                    id={`register-${registerType.title}`} 
                                />
                            )
                        }
                    </label>
                )
            })}    
        </FieldsetBase>
    )
}

export default RegisterOptionFieldset