import React from "react";
import formatMoney from "@/utils/formatMoney";
import styles from "@/components/Budget/Budget.module.css";

interface BudgetRowProps {
    category?: string;
    amount: number;
    used: number | null;
    remaining: number | null;
    subCategories?: BudgetItem[];
}
const BudgetRowSubcategory: React.FC<BudgetRowProps> = ({category, amount, used, remaining }) => {

    return (
        <div className={`${styles.tableRowLayoutSubcategory} font-light text-sm rounded-lg cursor-pointer`}>
            <div className={`py-1 truncate max-w-xs`}>{category}</div>
            <div className={``}>{formatMoney(amount)}</div>
            <div className={``}>{formatMoney(used)}</div>
            <div className={``}>{formatMoney(remaining)}</div>
        </div>
    )
}

export default BudgetRowSubcategory