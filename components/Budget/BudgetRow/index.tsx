'use client'

import React from 'react'
import formatMoney from '@/utils/formatMoney'
import styles from '@/components/Budget/Budget.module.css'
import BudgetRowSubcategory from '../BudgetRowSubcategory'

interface BudgetRowProps {
    categoryTitle: string;
    categoryAmount: number;
    categoryUsed: number | undefined;
    categoryRemaining: number | undefined;
    subcategories: BudgetItem[] | undefined;
    onClick: (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void;
}

const BudgetRow: React.FC<BudgetRowProps> = ({ 
        categoryTitle, 
        categoryAmount, 
        categoryUsed, 
        categoryRemaining, 
        onClick ,
        subcategories
    }) => {

    const handleClick = (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
        onClick(event)
    }

    return (
        <>
            {/*If subcategories exits, the style is different */}
            { subcategories && ( 
                <tr 
                    className='block border border-greenYellow rounded-lg mb-2 p-1 px-2 cursor-pointer'
                    onClick={handleClick} 
                >
                    { subcategories?.map((subcategory) => (
                        <BudgetRowSubcategory
                            key={subcategory.id}
                            category={subcategory.title}
                            amount={subcategory.amount}
                            used={subcategory.used}
                            remaining={subcategory.remaining}
                        />
                    ))}
                    <div 
                        className={`${styles.tableRowLayout} cursor-pointer`}
                        onClick={handleClick} 
                    >
                        <td className='truncate max-w-xs'>{categoryTitle}</td>
                        <td className=''>{formatMoney(categoryAmount)}</td>
                        <td className=''>{formatMoney(categoryUsed)}</td>
                        <td className=''>{formatMoney(categoryRemaining)}</td>
                    </div>
                </tr>
                ) 
            }
            {/*If subcategories doens't exits, this is the default style */}
            { !subcategories && (
                    <tr 
                        className={`${styles.tableRowLayout} border border-greenYellow rounded-lg mb-2 cursor-pointer`}
                        onClick={handleClick} 
                    >
                        <td className='px-2 truncate max-w-xs'>{categoryTitle}</td>
                        <td className=''>{formatMoney(categoryAmount)}</td>
                        <td className=''>{formatMoney(categoryUsed)}</td>
                        <td className=''>{formatMoney(categoryRemaining)}</td>
                    </tr>
            )}
        </>
    )
}


export default BudgetRow