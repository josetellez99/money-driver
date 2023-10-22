import React from 'react'

import ActionButton from '@/components/ActionButton'
import PopUpLayer from '@/components/PopupLayer'
import BorderDiv from '@/components/BorderDiv'
import ElementTitle from '@/components/ElementTitle'
import TitleFieldset from '@/components/FormRegister/TitleFieldset'
import AmountFieldset from '@/components/FormRegister/AmountFieldset'
import SubmitButton from '@/components/FormRegister/SubmitButton'
import MessageInfo from '@/components/MessageInfo'
import ConfirmationModal from '@/components/ConfirmationModal'

import styles from '@/components/Budget/Budget.module.css'
import formatMoney from '@/utils/formatMoney'
import {extractNumberFromString} from '@/utils/formatMoney'

interface EditCategoryModalProps {
    setShowEditCategoryModal: React.Dispatch<React.SetStateAction<boolean>>;
    showConfirmationModal: boolean;
    setShowConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
    selectedCategory: BudgetItem | undefined;
    setSelectedCategory: React.Dispatch<React.SetStateAction<BudgetItem | undefined>>;
    setBudgetData: React.Dispatch<React.SetStateAction<BudgetItem[] | undefined>>;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
    setShowEditCategoryModal,
    showConfirmationModal,
    setShowConfirmationModal,
    selectedCategory,
    setSelectedCategory,
    setBudgetData,
}) => {

    // The state of the fieldset that show the subcategories inputs
    const [showSubcategoriesFieldset, setShowSubcategoriesFieldset] = React.useState<boolean>(selectedCategory?.subcategories ? true : false)

    const totalSubcategoriesAmount = selectedCategory?.subcategories?.reduce((acc, subcategory) => {
        return acc + subcategory.amount
    }, 0)

    const handleClickClosePopUp = () => {
        setShowEditCategoryModal(false)
    }

    const handleShowSubcategoriesFieldset = () => {
        setShowSubcategoriesFieldset(true)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setBudgetData((prevState) => {
            const newState = prevState?.map((category) => {
                if (category.id === selectedCategory?.id) {
                    return selectedCategory
                }
                return category
            })
            return newState
        })
        setShowEditCategoryModal(false)
    }

    

    const handleClickDeleteCategory = () => {
        setShowConfirmationModal(true)
    }

    const TitleFieldsetOnChange = (value: string) => {
        setSelectedCategory((currentCategory) => {
            return {
                ...currentCategory,
                title: value
            }
        })
    }

    const AmountFieldsetOnChange = (value: string) => {
        setSelectedCategory((currentCategory) => {
            return {
                ...currentCategory,
                amount: value
            }
        })
    }

    const confirmationMondalDeletecategory = [
        {
            title: 'Si',
            id: 1,
            onClick: () => {
                setShowEditCategoryModal(false)
                setShowConfirmationModal(false)
                setComposeState((prevState) => {
                    const newState = prevState?.filter((category) => {
                        return category.id !== selectedCategory?.id
                    })
                    return newState;
                })
            },
            
        },
        {
            title: 'No',
            id: 2,
            onClick: () => {
                setShowConfirmationModal(false)
            }
        }
    ]

    
    const handleAddNewSubcategory = () => {
        setSelectedCategory((currentCategory) => {
            const newSubcategory = {
                id: Math.floor(Math.random() * (1100 - 1003 + 1)) + 1003,
                title: '',
                amount: 0
            };
            const subcategories = currentCategory?.subcategories || [];
            const newSubcategories = [...subcategories, newSubcategory];
            return {
                ...currentCategory,
                subcategories: newSubcategories
            };
        });
    };
    
    const handleOnChangeInputTitleSubcategory = (event: React.ChangeEvent<HTMLInputElement>, subcategoryID: number) => {
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

    const handleOnChangeInputAmountSubcategory = (event: React.ChangeEvent<HTMLInputElement>, subcategoryID: number) => {
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

    const deleteSubcategoryHandleClick = (subcategoryID : number) => {
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


    return (
        <>
            <PopUpLayer>
                        <div className='flex flex-col w-full '>
                            <button onClick={handleClickClosePopUp}>x</button>
                            <form action="" onSubmit={handleSubmit}>
                                <BorderDiv
                                    className='bg-backgroundBlue'
                                    >
                                        <div className='py-2'>
                                            <ElementTitle title='Editar categoria' />
                                            <TitleFieldset 
                                                title={selectedCategory?.title}
                                                onChange={TitleFieldsetOnChange}
                                            />
                                            {
                                                !showSubcategoriesFieldset && (
                                                    <AmountFieldset
                                                        title='Monto presupuestado'
                                                        amount={selectedCategory?.amount}
                                                        onChange={AmountFieldsetOnChange}
                                                    />
                                                )
                                            }
                                            {
                                                showSubcategoriesFieldset && (
                                                    <>
                                                        <AmountFieldset
                                                            titleElement='Monto presupuestado'
                                                            className=' bg-greenYellow text-black rounded-lg'
                                                            amount={totalSubcategoriesAmount}
                                                            readOnly={true}
                                                            />
                                                        <MessageInfo
                                                            message='El monto presupuestado será el total de la suma de las subcategorias'
                                                            />
                                                    </>
                                                )
                                            }
                                            <ActionButton 
                                                title='Eliminar esta categoria'
                                                type='delete'
                                                onClick={handleClickDeleteCategory}
                                            />
                                                { showConfirmationModal && (
                                                    <ConfirmationModal
                                                        buttonsData={confirmationMondalDeletecategory}
                                                        message='¿Estas seguro que quieres eliminar esta categoria?'
                                                    />
                                                )}
                                            {
                                                !showSubcategoriesFieldset && (
                                                    <div className='flex justify-end'>
                                                        <ActionButton 
                                                            title='Crear Subcategorias'
                                                            type='add'
                                                            onClick={handleShowSubcategoriesFieldset}
                                                        />
                                                    </div>
                                                )
                                            }
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
                                                        
                                                        { selectedCategory?.subcategories?.map((subCategory) => {
                                                            return (
                                                                <>
                                                                        <div className='flex justify-between items-center gap-4 mb-1'>
                                                                            <input 
                                                                                type="text"
                                                                                className={`${styles.subCategoriesInput} border-1 px-2 bg-backgroundBlue border-b-greenYellow w-2/4 `}
                                                                                value={subCategory.title}
                                                                                onChange={(event) => handleOnChangeInputTitleSubcategory(event, subCategory.id)}
                                                                            />
                                                                            <input 
                                                                                type="text"
                                                                                className={`${styles.subCategoriesInput} border-1 px-2 bg-backgroundBlue border-b-greenYellow w-2/4 text-end`}
                                                                                value={formatMoney(subCategory.amount)}
                                                                                onChange={(event) => handleOnChangeInputAmountSubcategory(event, subCategory.id)}
                                                                            />
                                                                            <button onClick={() => deleteSubcategoryHandleClick(subCategory.id)}>X</button>
                                                                        </div>
                                                                </>
                                                            )
                                                            })}

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
                                        </div>
                                </BorderDiv>
                            </form>
                            
                        </div>
                    </PopUpLayer>
        </>
    )
}

export default EditCategoryModal