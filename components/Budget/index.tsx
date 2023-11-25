import React from 'react'

import SectionDefault from '@/components/SectionDefault'

import ElementTitle from '@/components//ElementTitle'
import calculateBudgetTotals from '@/utils/calculateBudgetTotals'

import BudgetHeader from '@/components/Budget/BudgetHeader'
import BudgetRow from '@/components/Budget/BudgetRow'
import BudgetRowAddNewCategory from '@/components/Budget/BudgetRowAddNewCategory'
import BudgetRowFooter from '@/components/Budget/BudgetRowFooter'
import { fetchUserBudgetWithSubcategories } from '@/app/lib/action'
import { unstable_noStore as noStore } from 'next/cache';

interface BudgetProps {
    title: string;
    type: 'income' | 'expense';
}

const Budget: React.FC<BudgetProps> = async ({title, type}) => {
    noStore()
    
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