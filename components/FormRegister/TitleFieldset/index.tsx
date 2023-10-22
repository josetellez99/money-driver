import React, { ChangeEvent } from "react";

import FieldsetTitle from "@/components/FormRegister/FieldsetTitle";
import styles from './Title.module.css'

interface TitleFieldsetProps {
    className?: string,
    title: string | undefined,
    setComposeState: React.Dispatch<React.SetStateAction<BudgetItem[] | undefined>>,
    itemID: number
    
}

// We receive the title from a map but we receive the setState updater from a compose state

const TitleFieldset: React.FC<TitleFieldsetProps> = ({className, title, setComposeState, itemID}) => {
    
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {

            const {value} = event.target;

            setComposeState((prevState) => {
                const newState = prevState?.map((item) => {
                    if (item.id === itemID) {
                        return {
                            ...item,
                            title: value
                        };
                    }
                    return item;
                });
                return newState;
            });
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