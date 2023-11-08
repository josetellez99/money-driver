interface AddNewAccountRowProps {
    onClick: () => void
}

const AddNewAccountRow: React.FC<AddNewAccountRowProps> = ({onClick}) => {

    const handleClick = () => {
        onClick();
    }

    return(
        <>
            <tr 
                onClick={handleClick}
                className='flex justify-between border-2 border-greenYellow rounded-lg p-1 px-2 mb-2 w-full cursor-pointer'>
                <td className='font-bold'>Añadir nueva cuenta...</td>
            </tr>
        </>
    )
}

export default AddNewAccountRow;