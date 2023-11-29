import React from "react";

import FieldsetTitle from "@/components/FormRegister/FieldsetTitle";
import styles from './Title.module.css'

interface TitleFieldsetProps {
    className?: string,
    title: string | undefined,
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    readOnly?: boolean
}

// We receive the title from a map but we receive the setState updater from a compose state

const TitleFieldset: React.FC<TitleFieldsetProps> = ({className, title, onChange, readOnly}) => {
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(event)
    };

    const readOnlyStyles = readOnly ? 'bg-greenYellow text-black rounded-md' : ''

    return (
        <>
            <fieldset className="mb-6 w-full">
                <FieldsetTitle title='Titulo' />
                <input 
                    type="text" 
                    onChange={handleChange}
                    value={title}
                    readOnly={readOnly}
                    className={`h-[36px] w-full border-b-[1px] bg-backgroundBlue border-greenYellow px-3 focus:rounded-md ${styles.input} ${className} ${readOnlyStyles}`}
                />
            </fieldset>
        </>
    )
}

export default TitleFieldset