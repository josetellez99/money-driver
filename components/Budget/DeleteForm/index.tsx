'use client'

import React from 'react'

import ElementTitle from '@/components/ElementTitle'
import TitleFieldset from '@/components/FormRegister/TitleFieldset'
import AmountFieldset from '@/components/FormRegister/AmountFieldset'
import SubmitButton from '@/components/FormRegister/SubmitButton'
import MessageInfo from '@/components/MessageInfo'

import styles from '@/components/Budget/Budget.module.css'
import formatMoney from '@/utils/formatMoney'
import {deleteBudgetCategory} from '@/app/lib/action'

interface DeleteFormProps {
    currentCategory: BudgetItem;
}

const DeleteForm: React.FC<DeleteFormProps> = ({
    currentCategory,
}) => {

    // This state hold the information for the budget category that is being edited
    const [selectedCategory, setSelectedCategory] = React.useState<BudgetItem>(currentCategory)

    // The state of the fieldset that show the subcategories inputs
    const [showSubcategoriesFieldset, setShowSubcategoriesFieldset] = React.useState<boolean>(selectedCategory?.subcategories?.length === 0 ? false : true)

    const totalSubcategoriesAmount = selectedCategory?.subcategories?.reduce((acc, subcategory) => {
        return acc + subcategory.amount
    }, 0)


    return (
        <>
            <form action={() => deleteBudgetCategory(currentCategory)}>
                <ElementTitle title='Editar categoria' />
                <TitleFieldset 
                    title={selectedCategory?.title}
                    readOnly={true}
                />
                { !showSubcategoriesFieldset && (
                        <AmountFieldset
                            titleElement='Monto presupuestado'
                            amount={selectedCategory.amount}
                            readOnly={true}
                        />
                )}
                { showSubcategoriesFieldset && (
                    <>
                        <AmountFieldset
                            titleElement='Monto presupuestado'
                            className=' bg-greenYellow text-black rounded-lg'
                            amount={totalSubcategoriesAmount}
                            readOnly={true}
                        />
                        <MessageInfo
                            message='El monto presupuestado es el total de la suma de las subcategorias'
                        />
                    </>
                )}
                { showSubcategoriesFieldset && (
                    <>
                        <fieldset className='my-4'>
                            <ElementTitle
                                title='Subcategorias'
                            />
                            <div className='flex justify-between gap-4 mb-1' >
                                <h3>Titulo</h3>
                                <h3>Monto presupuestado</h3>
                            </div>
                            { selectedCategory?.subcategories?.map((subCategory) => (
                                <>
                                    <div className='flex justify-between items-center gap-4 mb-1'>
                                        <input
                                            type="text"
                                            className={`${styles.subCategoriesInput} border-1 px-2 bg-greenYellow border-b-greenYellow w-2/4 `}
                                            value={subCategory.title}
                                            readOnly={true}

                                        />
                                        <input
                                            type="text"
                                            className={`${styles.subCategoriesInput} border-1 px-2 bg-greenYellow border-b-greenYellow w-2/4 text-end`}
                                            value={formatMoney(subCategory.amount)}
                                            readOnly={true}
                                        />
                                    </div>
                                </>
                            ))}
                        </fieldset>
                    </>
                )}
                <SubmitButton 
                    title='Eliminar esta categoria'
                />
            </form>
        </>
    )
}

export default DeleteForm