import React, { ChangeEvent } from "react";

import FieldsetTitle from "@/components/FormRegister/FieldsetTitle";
import styles from './AmountFielset.module.css'
import formatMoney from "@/utils/formatMoney";
import { extractNumberFromString } from "@/utils/formatMoney";
import { set } from "date-fns";

interface AmountFieldsetProps {
    className?: string,
    title?: string,
    amount: number | undefined
    setComposeState?: React.Dispatch<React.SetStateAction<number | BudgetItem[] | undefined>>,
    readOnly?: boolean
}

const AmountFieldset: React.FC<AmountFieldsetProps> = ({className, title = 'Cantidad', amount, setComposeState, readOnly = false}) => {
    
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        const inputValue = extractNumberFromString(value); // Extract the number from the formated string input value
        setComposeState && setComposeState(inputValue); // validating it exits and Set the state with the numeric value
    };

    return(
        <>
            <fieldset className="mb-6 w-full">
                <FieldsetTitle title={title} />
                <input 
                    type="text" 
                    readOnly={readOnly}
                    onChange={handleChange}
                    value={formatMoney(amount)}
                    className={`h-[36px] w-full border-b-[1px] bg-backgroundBlue border-greenYellow px-3 focus:rounded-md ${styles.input} ${className}`}
                />
            </fieldset>
        </>
    )
}

export default AmountFieldset