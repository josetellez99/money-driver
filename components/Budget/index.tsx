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

    const[showEditCategoryModal, setShowEditCategoryModal] = React.useState<boolean>(false)
    const[showNewCategoryModal, setShowNewCategoryModal] = React.useState<boolean>(false)
    const[showConfirmationModal, setShowConfirmationModal] = React.useState<boolean>(false)

    const[budgetData, setBudgetData] = React.useState<BudgetItem[]>(userBudget)
    const[selectedCategory, setSelectedCategory] = React.useState<BudgetItem | undefined>(undefined)
    const[newCategory, setNewCategory] = React.useState<BudgetItem | undefined>(undefined)
    
    const [totalAmount, totalUsed, totalRemaining] = calculateBudgetTotals(budgetData)

    const budgetRowHandleClick = (category: BudgetItem) => {
        setSelectedCategory(category)
        setShowEditCategoryModal(true)
    }

    const budgetRowAddNewCategoryHandleClick = () => {
        setShowNewCategoryModal(true)
    }

    return (
        <>
            <SectionDefault className='my-4'>
                <ElementTitle title={title} />
                <table>
                    <BudgetHeader />
                    {
                        budgetData?.map((category) => (
                            <>
                                <BudgetRow
                                    key={category.id}
                                    itemID={category.id}
                                    categoryTitle={category.title}
                                    categoryAmount={category.amount}
                                    categoryUsed={category.used}
                                    categoryRemaining={category.remaining}
                                    onClick={() => budgetRowHandleClick(category)}
                                >
                                    { showEditCategoryModal && (
                                        <CategoryModal
                                            setShowCategoryModal={setShowEditCategoryModal}
                                            showConfirmationModal={showConfirmationModal}
                                            setShowConfirmationModal={setShowConfirmationModal}
                                            currentCategory={selectedCategory}
                                            setCurrentCategory={setSelectedCategory}
                                            setBudgetData={setBudgetData}
                                            type='Edit'
                                        />                                         
                                    )}
                                </BudgetRow>
                                {
                                    category.subcategories?.map((subcategory) => {
                                        return (
                                            <BudgetRowSubcategory
                                                key={subcategory.id}
                                                category={subcategory.title}
                                                amount={subcategory.amount}
                                                used={subcategory.used}
                                                remaining={subcategory.remaining}
                                            />
                                    )})
                                }
                            </>
                        ))
                    }
                    <BudgetRowAddNewCategory
                        onClick={budgetRowAddNewCategoryHandleClick}
                    >
                        { showNewCategoryModal && (
                            <CategoryModal
                                setShowCategoryModal={setShowNewCategoryModal}
                                showConfirmationModal={showConfirmationModal}
                                setShowConfirmationModal={setShowConfirmationModal}
                                currentCategory={newCategory}
                                setCurrentCategory={setNewCategory}
                                setBudgetData={setBudgetData}
                                type='Create'
                            /> 
                        )}
                    </BudgetRowAddNewCategory>
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