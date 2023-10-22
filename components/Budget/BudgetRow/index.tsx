'use client'

import React from 'react'
import formatMoney from '@/utils/formatMoney'
import styles from '@/components/Budget/Budget.module.css'

interface BudgetRowProps {
    children: React.ReactNode;
    itemID: number;
    categoryTitle: string;
    categoryAmount: number;
    categoryUsed: number | undefined;
    categoryRemaining: number | undefined;
    onClick: (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void;
}

const BudgetRow: React.FC<BudgetRowProps> = ({ children, categoryTitle, categoryAmount, categoryUsed, categoryRemaining, onClick }) => {

    const handleClick = (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
        onClick(event)
    }

    return (
        <>
            <tr 
                className={`${styles.tableRowLayout} border border-greenYellow rounded-lg mb-2 cursor-pointer`}
                onClick={handleClick} 
            >
                <td className='border-r border-greenYellow px-2'>{categoryTitle}</td>
                <td className='border-r border-greenYellow text-center'>{formatMoney(categoryAmount)}</td>
                <td className='border-r border-greenYellow text-center'>{formatMoney(categoryUsed)}</td>
                <td className=' text-center'>{formatMoney(categoryRemaining)}</td>
            </tr>
            {children}
        </>
    )
}

export default BudgetRow