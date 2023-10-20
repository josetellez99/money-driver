import React from "react"

import MessageInfo from "@/components/MessageInfo"
import ElementTitle from "@/components/ElementTitle"
import ActionButton from "@/components/ActionButton"
import EditSubcategoryInput from "@/components/Budget/BudgetRow/EditSubcategoryInputs"

interface SubcategoriesBudgetFieldsetProps {
    setShowSubcategoriesFieldset: React.Dispatch<React.SetStateAction<boolean>>;
    subCategoriesState: BudgetItem[] | undefined;
    setSubCategoriesState: React.Dispatch<React.SetStateAction<BudgetItem[] | undefined>>;
    addNewSubcategory: React.MouseEventHandler<HTMLButtonElement>;
}

const SubcategoriesBudgetFieldset: React.FC<SubcategoriesBudgetFieldsetProps> = ({
    setShowSubcategoriesFieldset,
    subCategoriesState,
    setSubCategoriesState,
    addNewSubcategory
}) => {
    return (
        <>
            <fieldset className='my-4'>
                <ElementTitle
                    title='Subcategorias'
                />
                <div className='flex justify-between gap-4 mb-1' >
                    <h3>Titulo</h3>
                    <h3>Monto presupuestado</h3>
                </div>
                    {
                        <fieldset>
                            {
                                subCategoriesState?.map((subCategory) => {
                                    return (
                                        <EditSubcategoryInput
                                            subcategoryID={subCategory.id}
                                            subCategoryTitle={subCategory.category}
                                            subCategoryAmount={subCategory.amount}
                                            setSubcategoryState={setSubCategoriesState}
                                        />
                                    )
                                })
                            }
                        </fieldset>
                    }
            </fieldset>
            <div className='flex flex-col items-end mt-2'>
                <ActionButton
                    title='Añadir subcategoria'
                    type='add'
                    onClick={addNewSubcategory}
                />
                <ActionButton 
                    title='Eliminar todas las subcategorias'
                    type='delete'
                    onClick={() => setShowSubcategoriesFieldset(false)}
                />
            </div>
        </>
    )
}

export default SubcategoriesBudgetFieldset