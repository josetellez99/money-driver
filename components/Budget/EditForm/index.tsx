'use client'

import React, { ChangeEvent } from 'react'

import ActionButton from '@/components/ActionButton'
import ElementTitle from '@/components/ElementTitle'
import TitleFieldset from '@/components/FormRegister/TitleFieldset'
import AmountFieldset from '@/components/FormRegister/AmountFieldset'
import SubmitButton from '@/components/FormRegister/SubmitButton'
import MessageInfo from '@/components/MessageInfo'

import styles from '@/components/Budget/Budget.module.css'
import formatMoney from '@/utils/formatMoney'
import {extractNumberFromString} from '@/utils/formatMoney'
import { useRouter } from 'next/navigation'
import {updateUSerBudgetCategory} from '@/app/lib/action'

interface EditFormProps {
    currentCategory: BudgetItem;
}

const EditForm: React.FC<EditFormProps> = ({
    currentCategory,
}) => {

    const router = useRouter()

    // This state hold the information for the budget category that is being edited
    const [selectedCategory, setSelectedCategory] = React.useState<BudgetItem>(currentCategory)

    // The state of the fieldset that show the subcategories inputs
    const [showSubcategoriesFieldset, setShowSubcategoriesFieldset] = React.useState<boolean>(selectedCategory?.subcategories ? true : false)

    const totalSubcategoriesAmount = selectedCategory?.subcategories?.reduce((acc, subcategory) => {
        return acc + subcategory.amount
    }, 0)

    const handleShowSubcategoriesFieldset = () => {
        setShowSubcategoriesFieldset(true)
        setSelectedCategory( (selectedCategory: any) => {
            const newSubcategory = {
                title: '',
                amount: 0
            };
            const subcategories = selectedCategory?.subcategories || [];
            const newSubcategories = [...subcategories, newSubcategory];
            return {
                ...selectedCategory,
                subcategories: newSubcategories
            };
        });
    }

    //This use effect is to make sure that the fieldset is not shown when the subcategories array is empty
    React.useEffect(() => {
        if(selectedCategory?.subcategories?.length === 0) {
            setShowSubcategoriesFieldset(false)
        }
    }, [selectedCategory?.subcategories])

    const TitleFieldsetOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target
        setSelectedCategory((currentCategory) => {
            return {
                ...currentCategory,
                title: value
            }
        })
    }

    const AmountFieldsetOnChange = (value: number) => {
        setSelectedCategory((currentCategory) => {
            return {
                ...currentCategory,
                amount: value
            }
        })
    }

    const handleAddNewSubcategory = () => {
        setSelectedCategory((currentCategory: any) => {
            const newSubcategory = {
                // This is not the "id" for the database, this is just a random number to identify the subcategory and handle it in the frontend
                id: (Math.floor(Math.random() * (13000 - 10000 + 1)) + 10000).toString(),
                title: '',
                amount: 0,
                used: 0,
                remaining: 0,
            };
            const subcategories = currentCategory?.subcategories || [];
            const newSubcategories = [...subcategories, newSubcategory];
            return {
                ...currentCategory,
                subcategories: newSubcategories
            };
        });
    };
    
    const SubcategoryTitle = (event: React.ChangeEvent<HTMLInputElement>, subcategoryID: string) => {
        const { value } = event.target;
        setSelectedCategory((currentCategory) => {
            const newSubcategories = currentCategory?.subcategories?.map((subcategory) => {
                if (subcategory.id === subcategoryID) {
                    return { ...subcategory, title: value };
                }
                return subcategory;
            });
            return { ...currentCategory, subcategories: newSubcategories };
        });
    };

    const subcategoryAmount = (event: React.ChangeEvent<HTMLInputElement>, subcategoryID: string) => {
        const { value } = event.target;
        setSelectedCategory((currentCategory) => {
            const newSubcategories = currentCategory?.subcategories?.map((subcategory) => {
                if (subcategory.id === subcategoryID) {
                    return { ...subcategory, amount: extractNumberFromString(value) };
                }
                return subcategory;
            });
            return { ...currentCategory, subcategories: newSubcategories };
        });
    };

    const deleteSubcategory = (event: React.MouseEvent<HTMLButtonElement>, subcategoryID : string) => {
        event.preventDefault();
        setSelectedCategory((currentCategory) => {
            const newSubcategories = currentCategory?.subcategories?.filter((subcategory) => {
                return subcategory.id !== subcategoryID;
            });
            return { ...currentCategory, subcategories: newSubcategories };
        });
    }

    const handleDeleteAllSubcategories = () => {
        setSelectedCategory((currentCategory) => {
            return {
                ...currentCategory,
                subcategories: []
            }
        })
        setShowSubcategoriesFieldset(false)
    }

    const deleteCategoryRedirect = () => {
        router.push(`/presupuesto-cuentas/delete-category-budget/${currentCategory.id}`)
    }


    return (
        <>
            <form action={() => updateUSerBudgetCategory(selectedCategory)}>
                <ElementTitle title='Editar categoria' />
                <TitleFieldset 
                    title={selectedCategory?.title}
                    onChange={TitleFieldsetOnChange}
                />
                { !showSubcategoriesFieldset && (
                        <AmountFieldset
                            titleElement='Monto presupuestado'
                            amount={selectedCategory.amount}
                            onChange={AmountFieldsetOnChange}
                        />
                )}
                { showSubcategoriesFieldset && (
                    <>
                        <AmountFieldset
                            titleElement='Monto presupuestado'
                            className=' bg-greenYellow text-black rounded-lg'
                            amount={totalSubcategoriesAmount!}
                            readOnly={true}
                        />
                        <MessageInfo
                            message='El monto presupuestado será el total de la suma de las subcategorias'
                        />
                    </>
                )}
                { !showSubcategoriesFieldset && (
                        <div className='flex justify-end'>
                            <ActionButton 
                                title='Crear Subcategorias'
                                type='add'
                                onClick={handleShowSubcategoriesFieldset}
                            />
                        </div>
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
                                            className={`${styles.subCategoriesInput} border-1 px-2 bg-backgroundBlue border-b-greenYellow w-2/4 `}
                                            value={subCategory.title}
                                            onChange={(event) => SubcategoryTitle(event, subCategory.id!)}
                                        />
                                        <input
                                            type="text"
                                            className={`${styles.subCategoriesInput} border-1 px-2 bg-backgroundBlue border-b-greenYellow w-2/4 text-end`}
                                            value={formatMoney(subCategory.amount)}
                                            onChange={(event) => subcategoryAmount(event, subCategory.id!)}
                                        />
                                        <button onClick={(event) => deleteSubcategory(event, subCategory.id!)}>X</button>
                                    </div>
                                </>
                            ))}
                        </fieldset>
                        <div className='flex flex-col items-end mt-2'>
                            <ActionButton
                                title='Añadir subcategoria'
                                type='add'
                                onClick={handleAddNewSubcategory}
                            />
                            <ActionButton 
                                title='Eliminar todas las subcategorias'
                                type='delete'
                                onClick={handleDeleteAllSubcategories}
                            />
                        </div>
                    </>
                )}
                <SubmitButton 
                    title='Guardar'
                />
                <ActionButton 
                    title='Eliminar esta categoria'
                    type='delete'
                    onClick={deleteCategoryRedirect}
                />
            </form>
        </>
    )
}

export default EditForm