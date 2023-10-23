'use client'

import React from 'react'
import formatMoney from '@/utils/formatMoney'
import styles from '@/components/Budget/Budget.module.css'
import BudgetRowSubcategory from '../BudgetRowSubcategory'

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
            {/* <tr 
                className={`${styles.tableRowLayout} border border-greenYellow rounded-lg mb-2 cursor-pointer`}
                onClick={handleClick} 
            >
                <td className='border-r border-greenYellow px-2 truncate max-w-xs'>{categoryTitle}</td>
                <td className='border-r border-greenYellow text-center'>{formatMoney(categoryAmount)}</td>
                <td className='border-r border-greenYellow text-center'>{formatMoney(categoryUsed)}</td>
                <td className=' text-center'>{formatMoney(categoryRemaining)}</td>
            </tr>
            {children} */}
            { true && (
                <tr className='block border border-greenYellow rounded-lg mb-2 px-2 cursor-pointer'>
                    <p>categoryTitle</p>
                    <BudgetRowSubcategory 
                        category='Subcategory'
                        amount={1000000}
                        used={500000}
                        remaining={500000}
                    />
                </tr>
                )
            }
        </>
    )
}


export default BudgetRow