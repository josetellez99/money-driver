import React from 'react'
import { forwardRef } from 'react';
import FieldsetTitle from '@/components/FormRegister/FieldsetTitle';
import {getDateSpanishFormat} from '@/utils/getDateSpanishFormat';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateFieldSetProps {
    date: Date,
    setDate: React.Dispatch<React.SetStateAction<Date>>,
}

interface CustomInputDateProps {
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const DateFieldSet: React.FC<DateFieldSetProps> = ({date, setDate}) => {
    
    const CustomInputDate: React.FC<CustomInputDateProps> = forwardRef(({ onClick }, ref) => {

        const dateSpanishFormat = getDateSpanishFormat(date)

        return (
            <>     
                <div className=" p-2 px-4 rounded border border-greenYellow cursor-pointer" onClick={onClick} ref={ref} >
                    {dateSpanishFormat}
                </div>
            </>
        )
});

    const onChangeHandle = (currentDate: Date) => {
        setDate(currentDate)
    }

    return (
        <>
            <fieldset className='flex justify-between icons-middle items-center my-5 w-full'>
                <FieldsetTitle title='Seleccion una fecha' />

                <DatePicker
                    selected={date}
                    todayButton="Hoy"
                    onChange={onChangeHandle}
                    customInput={<CustomInputDate />}
                    />
            </fieldset>
        </>
    );
}

export default DateFieldSet