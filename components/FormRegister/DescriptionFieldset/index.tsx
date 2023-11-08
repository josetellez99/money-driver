import React, { ChangeEvent } from "react";

import FieldsetTitle from "@/components/FormRegister/FieldsetTitle";
import styles from './DescriptionFieldset.module.css'

interface descriptionFieldsetProps {
    description: string | undefined,
    onChange?: (value: string) => void,
}

const DescriptionFieldset: React.FC<descriptionFieldsetProps> = ({description, onChange}) => {
    
    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const {value} = event.target;
        onChange && onChange(value);
    };

    return(
        <>
            <fieldset className="mb-6 w-full">
                <FieldsetTitle title="Añade una descripción" />
                <textarea 
                    onChange={handleChange}
                    value={description}
                    className={`h-[60px] w-full text-sm border-b-[1px] p-1 bg-backgroundBlue border-greenYellow px-3 focus:rounded-md ${styles.textarea}`}
                />
            </fieldset>
        </>
    )
}

export default DescriptionFieldset