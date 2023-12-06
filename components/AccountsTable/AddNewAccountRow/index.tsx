'use client'

import Link from "next/link"

interface AddNewAccountRowProps {
    href: string,
}

const AddNewAccountRow: React.FC<AddNewAccountRowProps> = ({href}) => {

    return(
        <>
            <tr 
                className='px-2 mb-2 w-full cursor-pointer'
            >
                <Link
                    href={href}
                >
                    <td className='font-bold'>
                        <p className="flex gap-2 items-center">
                            <span className="text-xl text-greenYellow">+</span>
                            <span>Añadir nueva cuenta...</span>
                        </p>
                    </td>
                </Link>
            </tr>
        </>
    )
}

export default AddNewAccountRow;