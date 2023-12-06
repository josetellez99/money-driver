import styles from '@/components/Budget/Budget.module.css'
import React from 'react';

interface BudgetHeaderProps {
    type: 'income' | 'expense';
}

const BudgetHeader: React.FC<BudgetHeaderProps> = ({type}) => {

    let titles = []

    if (type === 'income') {
        titles = ['Categoria', 'Presupuesto', 'Ingresado', 'Por Ingresar']
    } else {
        titles = ['Categoria', 'Presupuesto', 'Gastado', 'Por gastar']
    }

    return (
        <>
            <thead>
                <tr className={`${styles.tableRowLayout}`}>
                    {titles.map((title) => (
                        <th key={title}>{title}</th>
                    ))}
                </tr>
            </thead>
        </>
    )
}

export default BudgetHeader