import React, { ChangeEvent } from "react";

import FieldsetTitle from "@/components/FormRegister/FieldsetTitle";
import styles from './Title.module.css'

interface TitleFieldsetProps {
    className?: string,
    title: string | undefined,
    setTitle: React.Dispatch<React.SetStateAction<string | undefined>>,
    
}

const TitleFieldset: React.FC<TitleFieldsetProps> = ({className, title, setTitle}) => {
    
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            const inputValue = event.target.value;
            setTitle(inputValue);
    };

    return (
        <>
            <fieldset className="mb-6 w-full">
                <FieldsetTitle title='Titulo' />
                <input 
                    type="text" 
                    onChange={handleChange}
                    defaultValue={title}
                    value={title}
                    className={`h-[36px] w-full border-b-[1px] bg-backgroundBlue border-greenYellow px-3 focus:rounded-md ${styles.input} ${className}`}
                />
            </fieldset>
        </>
    )
}

export default TitleFieldset