'use client'

import React from 'react'
import formatMoney from '@/utils/formatMoney'
import styles from '@/components/Budget/Budget.module.css'
import EditBudgetItemModal from '@/components/Budget/BudgetRow/EditBudgetItemModal'

interface BudgetRowProps {
    category?: string;
    amount: number;
    used: number | undefined;
    remaining: number | undefined;
    subCategories?: BudgetItem[];
}

const BudgetRow: React.FC<BudgetRowProps> = ({ category, amount, used, remaining, subCategories }) => {

    const [showModal, setShowModal] = React.useState<boolean>(false)

    // These states are used to pass the information to the modal and be able to edit it.

    const [categoryState, setCategoryState] = React.useState<string | undefined>(category)
    const [amountState, setAmountState] = React.useState<number | undefined>(amount)
    const [subCategoriesState, setSubCategoriesState] = React.useState<BudgetItem[] | undefined>(subCategories)

    // We don't have states for used and remaining because they are calculated from the user information, it is not editable.

    const handleClick = () => {
        setShowModal(true)
    }

    return (
        <>
            <tr 
                className={`${styles.tableRowLayout} border border-greenYellow rounded-lg mb-2 cursor-pointer`}
                onClick={handleClick} 
            >
                <td className='border-r border-greenYellow px-2'>{category}</td>
                <td className='border-r border-greenYellow text-center'>{formatMoney(amount)}</td>
                <td className='border-r border-greenYellow text-center'>{formatMoney(used)}</td>
                <td className=' text-center'>{formatMoney(remaining)}</td>
            </tr>
            {
                showModal && (
                    <>
                        <EditBudgetItemModal 
                            setShowModal={setShowModal}
                            categoryState={categoryState}
                            setCategoryState={setCategoryState}
                            amountState={amountState}
                            setAmountState={setAmountState}
                            subCategoriesState={subCategoriesState}
                            setSubCategoriesState={setSubCategoriesState}
                        />
                    </>
                )
            }
        </>
    )
}

export default BudgetRow