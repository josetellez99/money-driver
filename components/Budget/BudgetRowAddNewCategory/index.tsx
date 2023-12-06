import React from 'react'
import styles from '@/components/Budget/Budget.module.css'
import Link from 'next/link'

interface BudgetRowAddNewCategoryProps {
    href: string;
}

const BudgetRowAddNewCategory: React.FC<BudgetRowAddNewCategoryProps> = ({href}) => {

    return (
        <>
        <tr 
            className={`${styles.tableRowNewCategoryLayout} my-2 cursor-pointer`}
        >
            <Link
                href={href}
            >
                <td className='font-bold'>
                        <p className="flex gap-2 items-center">
                            <span className="text-xl text-greenYellow">+</span>
                            <span>Añadir nueva categoria...</span>
                        </p>
                    </td>
            </Link>
        </tr>
        </>
    )
}

export default BudgetRowAddNewCategory