import React from "react";

interface AddNewCreditCardRowProps {
    onClick: () => void
}

const AddNewCreditCardRow: React.FC<AddNewCreditCardRowProps> = ({onClick}) => {

    const handleClick = () => {
        onClick();
    }

    return(
        <>
            <tr 
                onClick={handleClick} 
                className='flex justify-between border-2 border-greenYellow rounded-lg p-1 font-bold px-2 mb-2 w-full cursor-pointer'
            >
                <td className='truncate max-w-[170px]'>Agregar una nueva tarketa de crédito...</td>
            </tr>
        </>
    )
}

export default AddNewCreditCardRow;