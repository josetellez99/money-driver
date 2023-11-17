'use client'

import React from 'react'
import formatMoney from '@/utils/formatMoney'
import styles from '@/components/Budget/Budget.module.css'
import BudgetRowSubcategory from '../BudgetRowSubcategory'
import Link from 'next/link'

interface BudgetRowProps {
    href: string;
    categoryTitle: string;
    categoryAmount: number;
    categoryUsed: number | undefined;
    categoryRemaining: number | undefined;
    subcategories: BudgetItem[] | undefined;
}

const BudgetRow: React.FC<BudgetRowProps> = ({
        href,
        categoryTitle, 
        categoryAmount, 
        categoryUsed, 
        categoryRemaining, 
        subcategories
    }) => {

    return (
        <>
            {/*If subcategories exits, the style is different */}
            { subcategories && ( 
                <tr 
                    className='block border border-greenYellow rounded-lg mb-2 p-1 px-2 cursor-pointer'
                >
                    <Link
                        href={href}
                        className='block'
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
                        >
                            <td className='truncate max-w-xs'>{categoryTitle}</td>
                            <td className=''>{formatMoney(categoryAmount)}</td>
                            <td className=''>{formatMoney(categoryUsed)}</td>
                            <td className=''>{formatMoney(categoryRemaining)}</td>
                        </div>
                    </Link>
                </tr>
                ) 
            }
            {/*If subcategories doens't exits, this is the default style */}
            { !subcategories && (
                <tr 
                    className={`${styles.tableRowLayout} border border-greenYellow rounded-lg mb-2 cursor-pointer`}
                >
                    <Link
                        href={href}
                        className={`${styles.tableRowLayout}`}
                    >
                        <td className='px-2 truncate max-w-xs'>{categoryTitle}</td>
                        <td className='text-center'>{formatMoney(categoryAmount)}</td>
                        <td className='text-center'>{formatMoney(categoryUsed)}</td>
                        <td className='text-center'>{formatMoney(categoryRemaining)}</td>
                    </Link>
                </tr>
            )}
        </>
    )
}


export default BudgetRow