import React from 'react'
import styles from '@/components/Budget/Budget.module.css'
import CreateNewCategoryModal from '@/components/Budget/CreateNewCategoryModal'

interface BudgetRowAddNewCategoryProps {
    children: React.ReactNode;
    onClick: React.MouseEventHandler<HTMLTableRowElement>;
}

const BudgetRowAddNewCategory: React.FC<BudgetRowAddNewCategoryProps> = ({children, onClick}) => {

    const handleClick = (event: React.MouseEvent<HTMLTableRowElement>) => {
        onClick(event)
    }

    return (
        <>
            <tr 
                className={`${styles.tableRowNewCategoryLayout} border-2 border-greenYellow rounded-lg my-2 cursor-pointer`}
                onClick={handleClick} 
            >
                <td className='border-greenYellow px-2 font-bold'>Añadir nueva categoria...</td>
            </tr>
            {children}
        </>
    )
}

export default BudgetRowAddNewCategory