import styles from '@/components/Budget/Budget.module.css'

const BudgetHeader = () => {
    return (
        <>
            <thead>
                <tr className={`${styles.tableRowLayout}`}>
                    <th className=''>Categoria</th>
                    <th>Monto</th>
                    <th>Usado</th>
                    <th>Por usar</th>
                </tr>
            </thead>
        </>
    )
}

export default BudgetHeader