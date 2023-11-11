import React, { ChangeEvent } from "react";

import FieldsetTitle from "@/components/FormRegister/FieldsetTitle";
import styles from './AmountFielset.module.css'
import formatMoney from "@/utils/formatMoney";
import { extractNumberFromString } from "@/utils/formatMoney";

interface AmountFieldsetProps {
    className?: string,
    titleElement?: string,
    amount: number | undefined
    onChange?: (value: number) => void,
    readOnly?: boolean
}

const AmountFieldset: React.FC<AmountFieldsetProps> = ({className, titleElement = 'Cantidad', amount, onChange, readOnly = false}) => {
    
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        const valueAsNumber = extractNumberFromString(value); // Extract the number from the formated string input value
        onChange && onChange(valueAsNumber)
    };

    const readOnlyStyles = readOnly ? 'bg-greenYellow text-black  rounded-md' : ''

    return(
        <>
            <fieldset className="mb-6 w-full">
                <FieldsetTitle title={titleElement} />
                <input 
                    type="text" 
                    readOnly={readOnly}
                    onChange={handleChange}
                    required
                    value={formatMoney(amount)}
                    className={`h-[36px] w-full border-b-[1px] bg-backgroundBlue border-greenYellow px-3 focus:rounded-md ${styles.input} ${className} ${readOnlyStyles}`}
                />
            </fieldset>
        </>
    )
}

export default AmountFieldset