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
            className={`${styles.tableRowNewCategoryLayout} border-2 border-greenYellow rounded-lg my-2 cursor-pointer`}
        >
            <Link
                href={href}
            >
                <td className='border-greenYellow px-2 font-bold'>Añadir nueva categoria...</td>
            </Link>
        </tr>
        </>
    )
}

export default BudgetRowAddNewCategory