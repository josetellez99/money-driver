'use client'

import React from 'react'

import SectionDefault from '@/components/SectionDefault'

import ElementTitle from '@/components//ElementTitle'
import calculateBudgetTotals from '@/utils/calculateBudgetTotals'

import BudgetHeader from '@/components/Budget/BudgetHeader'
import BudgetRow from '@/components/Budget/BudgetRow'
import BudgetRowSubcategory from '@/components/Budget/BudgetRowSubcategory'
import BudgetRowAddNewCategory from '@/components/Budget/BudgetRowAddNewCategory'
import BudgetRowFooter from '@/components/Budget/BudgetRowFooter'

interface BudgetProps {
    userBudget: BudgetItem[];
    title: string;
    type: 'incomes' | 'expenses';
}

const Budget: React.FC<BudgetProps> = ({userBudget, title, type}) => {

    const [totalAmount, totalUsed, totalRemaining] = calculateBudgetTotals(userBudget)

    return (
        <>
            <SectionDefault className='my-4'>
                <ElementTitle title={title} />
                <table>
                    <BudgetHeader />
                    {
                        userBudget.map((budget) => (
                                    <>
                                        <BudgetRow
                                            key={budget.category}
                                            category={budget.category}
                                            amount={budget.amount}
                                            used={budget.used}
                                            remaining={budget.remaining}
                                            subCategories={budget.subcategories}
                                        />
                                        {
                                            budget.subcategories?.map((subcategory) => {
                                                return (
                                                    <BudgetRowSubcategory
                                                        key={subcategory.category}
                                                        category={subcategory.category}
                                                        amount={subcategory.amount}
                                                        used={subcategory.used}
                                                        remaining={subcategory.remaining}
                                                    />
                                            )})
                                        }
                                    </>
                                ))
                    }
                    <BudgetRowAddNewCategory />
                    <BudgetRowFooter
                        amount={totalAmount}
                        used={totalUsed}
                        remaining={totalRemaining}
                    />
                </table>
            </SectionDefault>
        </>
    )
}

export default Budget