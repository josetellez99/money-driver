import React from "react"

import MessageInfo from "@/components/MessageInfo"
import ElementTitle from "@/components/ElementTitle"
import ActionButton from "@/components/ActionButton"
import EditSubcategoryInput from "@/components/Budget/BudgetRow/EditSubcategoryInputs"

interface SubcategoriesBudgetFieldsetProps {
    children?: React.ReactNode;
    setShowSubcategoriesFieldset: React.Dispatch<React.SetStateAction<boolean>>;
    addNewSubcategory?: React.MouseEventHandler<HTMLButtonElement>;
    setComposeState: React.Dispatch<React.SetStateAction<BudgetItem[] | undefined>>;
}

const SubcategoriesBudgetFieldset: React.FC<SubcategoriesBudgetFieldsetProps> = ({
    children,
    setShowSubcategoriesFieldset,
    addNewSubcategory,
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
                {children}
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