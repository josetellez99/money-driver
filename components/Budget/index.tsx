import React from 'react'

import SectionDefault from '@/components/SectionDefault'

import ElementTitle from '@/components//ElementTitle'
import calculateBudgetTotals from '@/utils/calculateBudgetTotals'

import BudgetHeader from '@/components/Budget/BudgetHeader'
import BudgetRow from '@/components/Budget/BudgetRow'
import BudgetRowAddNewCategory from '@/components/Budget/BudgetRowAddNewCategory'
import BudgetRowFooter from '@/components/Budget/BudgetRowFooter'
import { fetchUserBudgetWithSubcategories } from '@/app/lib/action'

interface BudgetProps {
    title: string;
    type: 'income' | 'expense';
}

// Hay que arreglar el tema de los totales en el row cuando la categoria tiene subcategorias, eso debe setearse en la base de datos, esa especifica informacion no se debe calcular en el cliente
// Ese tema debe actualizarse cuando modificas los inputs de las subcategorias, allí debe actualizarse el amount y el remaining
const Budget: React.FC<BudgetProps> = async ({title, type}) => {

    const budgetData: BudgetItem[] = await fetchUserBudgetWithSubcategories(type)

    const [totalAmount, totalUsed, totalRemaining] = calculateBudgetTotals(budgetData)

    return (
        <>
            <SectionDefault className='my-4'>
                <ElementTitle title={title} />
                <table>
                    <BudgetHeader />
                    <tbody>
                        { budgetData?.map((category) => (
                                <>
                                    <BudgetRow
                                        href={`/presupuesto-cuentas/edit-category-budget/${category.id}`}
                                        key={category.id}
                                        categoryTitle={category.title}
                                        categoryAmount={category.amount}
                                        categoryUsed={category.used}
                                        categoryRemaining={category.remaining}
                                        subcategories={category.subcategories}
                                    />
                                </>
                            ))}
                        <BudgetRowAddNewCategory 
                            href={`/presupuesto-cuentas/create-category-budget/${type}`}
                        />
                    </tbody>
                    <tfoot>
                        <BudgetRowFooter
                            amount={totalAmount}
                            used={totalUsed}
                            remaining={totalRemaining}
                        />
                    </tfoot>
                </table>
            </SectionDefault>
        </>
    )
}

export default Budget