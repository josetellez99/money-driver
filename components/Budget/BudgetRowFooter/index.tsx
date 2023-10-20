import React from 'react'
import formatMoney from '@/utils/formatMoney'
import styles from '@/components/Budget/Budget.module.css'

interface BudgetRowProps {
    category?: string;
    amount: number;
    used: number;
    remaining: number;
}

const BudgetRowFooter: React.FC<BudgetRowProps> = ({ amount, used, remaining }) => {
    return (
        <tr className={`${styles.tableRowFooterLayout} border border-greenYellow rounded-lg mb-2`}>
            <td className='border-r border-greenYellow px-2'>Total</td>
            <td className='border-r border-greenYellow text-center'>{formatMoney(amount)}</td>
            <td className='border-r border-greenYellow text-center'>{formatMoney(used)}</td>
            <td className=' text-center'>{formatMoney(remaining)}</td>
        </tr>
    )
}

export default BudgetRowFooter