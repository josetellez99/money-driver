import React from 'react'
import { forwardRef } from 'react';
import FieldsetBase from '@/components/FormRegister/FieldsetBase';
import FieldsetTitle from '@/components/FormRegister/FieldsetTitle';
import {getDateSpanishFormat} from '@/utils/getDateSpanishFormat';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CustomInputDateProps {
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

interface DateFieldSetProps {
    currentTransaction: Transaction,
    setCurrentTransaction: React.Dispatch<React.SetStateAction<Transaction>>,
}

const DateFieldSet: React.FC<DateFieldSetProps> = ({currentTransaction, setCurrentTransaction}) => {
    
    const CustomInputDate: React.FC<CustomInputDateProps> = forwardRef(({ onClick }, ref) => {
        const dateSpanishFormat = getDateSpanishFormat(currentTransaction.date as Date)
        return (
            <>     
                <div className=" p-2 px-4 rounded border border-greenYellow cursor-pointer" onClick={onClick} >
                    {dateSpanishFormat}
                </div>
            </>
        )
    });

    // This is to solve an error while deployment
    CustomInputDate.displayName = 'CustomInputDate';

    const onChangeHandle = (currentDate: Date) => {
        setCurrentTransaction({
            ...currentTransaction,
            date: currentDate
        })
    }

    return (
        <>
        <FieldsetBase
            className='justify-between my-5'
        >
                <FieldsetTitle title='Seleccion una fecha' />
                <DatePicker
                    selected={currentTransaction.date as Date}
                    todayButton="Hoy"
                    onChange={onChangeHandle}
                    customInput={<CustomInputDate />}
                />
        </FieldsetBase>
        </>
    );
}

export default DateFieldSet