'use client'

import Link from "next/link"

interface AddNewAccountRowProps {
    href: string,
}

const AddNewAccountRow: React.FC<AddNewAccountRowProps> = ({href}) => {

    return(
        <>
            <tr 
                className='flex justify-between border-2 border-greenYellow rounded-lg p-1 px-2 mb-2 w-full cursor-pointer'
            >
                <Link
                    href={href}
                >
                    <td className='font-bold'>Añadir nueva cuenta...</td>
                </Link>
            </tr>
        </>
    )
}

export default AddNewAccountRow;