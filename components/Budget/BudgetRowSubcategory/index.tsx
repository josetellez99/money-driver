import React from "react";
import formatMoney from "@/utils/formatMoney";
import styles from "@/components/Budget/Budget.module.css";

interface BudgetRowProps {
    category?: string;
    amount: number;
    used: number | undefined;
    remaining: number | undefined;
    subCategories?: BudgetItem[];
}
const BudgetRowSubcategory: React.FC<BudgetRowProps> = ({ category, amount, used, remaining }) => {
    return (
        <tr className={`${styles.tableRowLayoutSubcategory} border border-greenYellow rounded-lg mb-2 cursor-pointer`}>
            <td className='border-r border-greenYellow px-2'>{category}</td>
            <td className='border-r border-greenYellow text-center'>{formatMoney(amount)}</td>
            <td className='border-r border-greenYellow text-center'>{formatMoney(used)}</td>
            <td className=' text-center'>{formatMoney(remaining)}</td>
        </tr>
    )
}

export default BudgetRowSubcategory