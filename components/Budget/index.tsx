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
import CategoryModal from '@/components/Budget/CategoryModal'

interface BudgetProps {
    userBudget: BudgetItem[];
    title: string;
    type: 'incomes' | 'expenses';
}

const Budget: React.FC<BudgetProps> = ({userBudget, title, type}) => {

    const[showCategoryModal, setShowCategoryModal] = React.useState<boolean>(false)
    const[showConfirmationModal, setShowConfirmationModal] = React.useState<boolean>(false)
    const[typeOfModal, setTypeOfModal] = React.useState<'Create' | 'Edit'>('Edit')

    const[budgetData, setBudgetData] = React.useState<BudgetItem[]>(userBudget)
    const[currentCategory, setCurrentCategory] = React.useState<BudgetItem | undefined>(undefined)
    
    const [totalAmount, totalUsed, totalRemaining] = calculateBudgetTotals(budgetData)

    console.log('budgetData', budgetData)

    const budgetRowHandleClick = (category: BudgetItem) => {
        setCurrentCategory(category)
        setShowCategoryModal(true)
        setTypeOfModal('Edit')
    }

    const budgetRowAddNewCategoryHandleClick = () => {
        setShowCategoryModal(true)
        setTypeOfModal('Create')
        setCurrentCategory((currentCategory) => {
            return {
                title: '',
                amount: undefined,
                id: Math.floor(Math.random() * (1300 - 1000 + 1)) + 1000, 
                used: 0, 
                remaining: 0}
        })
    }

    return (
        <>
            <SectionDefault className='my-4'>
                <ElementTitle title={title} />
                <table>
                    
                    <BudgetHeader />
                    <tbody>
                    {
                        budgetData?.map((category) => (
                            <>
                                <BudgetRow
                                    key={category.id}
                                    categoryTitle={category.title}
                                    categoryAmount={category.amount}
                                    categoryUsed={category.used}
                                    categoryRemaining={category.remaining}
                                    subcategories={category.subcategories}
                                    onClick={() => budgetRowHandleClick(category)}
                                />
                            </>
                        ))
                    }
                        <BudgetRowAddNewCategory
                            onClick={budgetRowAddNewCategoryHandleClick}
                        />
                        { showCategoryModal && (
                            <CategoryModal
                            setShowCategoryModal={setShowCategoryModal}
                            showConfirmationModal={showConfirmationModal}
                            setShowConfirmationModal={setShowConfirmationModal}
                            currentCategory={currentCategory}
                            setCurrentCategory={setCurrentCategory}
                            setBudgetData={setBudgetData}
                            actionType={typeOfModal}
                            /> 
                        )}
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