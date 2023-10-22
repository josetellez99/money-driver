import React from "react";

import FieldsetTitle from "@/components/FormRegister/FieldsetTitle";
import styles from './Title.module.css'

interface TitleFieldsetProps {
    className?: string,
    title: string | undefined,
    onChange: React.ChangeEventHandler<HTMLInputElement>  
}

// We receive the title from a map but we receive the setState updater from a compose state

const TitleFieldset: React.FC<TitleFieldsetProps> = ({className, title, onChange}) => {
    
    const handleChange = (event: React.ChangeEventHandler<HTMLInputElement>) => {

            const {value} = event.target;
            onChange(value)
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