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

interface CategoryModalProps {
    setShowCategoryModal: React.Dispatch<React.SetStateAction<boolean>>;
    showConfirmationModal: boolean;
    setShowConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
    currentCategory: BudgetItem | undefined;
    setCurrentCategory: React.Dispatch<React.SetStateAction<BudgetItem | undefined>>;
    setBudgetData: React.Dispatch<React.SetStateAction<BudgetItem[]>>;
    type: 'Create' | 'Edit';
}

const CategoryModal: React.FC<CategoryModalProps> = ({
    setShowCategoryModal,
    showConfirmationModal,
    setShowConfirmationModal,
    currentCategory,
    setCurrentCategory,
    setBudgetData,
    type
}) => {

    // The state of the fieldset that show the subcategories inputs
    const [showSubcategoriesFieldset, setShowSubcategoriesFieldset] = React.useState<boolean>(currentCategory?.subcategories ? true : false)


    const handleClickClosePopUp = () => {
        setShowCategoryModal(false)
    }

    const handleShowSubcategoriesFieldset = () => {
        setShowSubcategoriesFieldset(true)
        setCurrentCategory((currentCategory) => {
            const newSubcategory = {
                id: Math.floor(Math.random() * (1100 - 1003 + 1)) + 1003,
                title: '',
                amount: 0,
                used: 0,
                remaining: 0
            };
            const subcategories = currentCategory?.subcategories || [];
            const newSubcategories = [...subcategories, newSubcategory];

            const newCurrentCategory = {
                ...currentCategory,
                amount: 0,
                subcategories: newSubcategories
            }
            return newCurrentCategory
        });
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (type === 'Create') {
            setBudgetData((prevState) => {
                const newState = prevState?.concat(currentCategory)
                return newState
            })
            setCurrentCategory(undefined)
        } else if (type === 'Edit') {
            setBudgetData((prevState) => {
                const newState = prevState?.map((category) => {
                    if (category.id === currentCategory?.id) {
                        return currentCategory
                    }
                    return category
                })
                return newState
            })
        }

        setShowCategoryModal(false)
    }

       //This use effect is to make sure that the fieldset is not shown when the subcategories array is empty
       React.useEffect(() => {
        if(currentCategory?.subcategories?.length === 0) {
            setShowSubcategoriesFieldset(false)
        }
    }, [currentCategory?.subcategories])


    const confirmationMondalDeletecategory = [
        {
            title: 'Si',
            id: 1,
            onClick: () => {
                setShowCategoryModal(false)
                setShowConfirmationModal(false)
                setBudgetData((prevState) => {
                    const newState = prevState?.filter((category) => {
                        return category.id !== currentCategory?.id
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

    const handleClickDeleteCategory = () => {
        setShowConfirmationModal(true)
    }

    const TitleFieldsetOnChange = (value: string) => {
        setCurrentCategory((currentCategory) => {
            return {
                ...currentCategory,
                title: value
            }
        })
    }

    const AmountFieldsetOnChange = (value: string) => {
        setCurrentCategory((currentCategory) => {
            return {
                ...currentCategory,
                amount: value
            }
        })
    }

   

    
    const handleAddNewSubcategory = () => {
        setCurrentCategory((currentCategory) => {
            const newSubcategory = {
                id: Math.floor(Math.random() * (1300 - 1000 + 1)) + 1000,
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
        setCurrentCategory((currentCategory) => {
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
        setCurrentCategory((currentCategory) => {
            const newSubcategories = currentCategory?.subcategories?.map((subcategory) => {
                if (subcategory.id === subcategoryID) {
                    return { ...subcategory, amount: extractNumberFromString(value) };
                }
                return subcategory;
            });

            const totalSubcategoriesAmount = newSubcategories?.reduce((acc, subcategory) => {
                return acc + subcategory.amount
            }, 0)

            const newCurrentCategory = {
                ...currentCategory,
                amount: totalSubcategoriesAmount,
                subcategories: newSubcategories
            }
            return newCurrentCategory;
        });
    };

    const deleteSubcategoryHandleClick = (event: React.MouseEvent<HTMLButtonElement>, subcategoryID : number) => {
        event.preventDefault();
        setCurrentCategory((currentCategory) => {
            const newSubcategories = currentCategory?.subcategories?.filter((subcategory) => {
                return subcategory.id !== subcategoryID;
            });
            return { ...currentCategory, subcategories: newSubcategories };
        });
    }

    const handleDeleteAllSubcategories = () => {
        setCurrentCategory((currentCategory) => {
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
                                            <ElementTitle title={type === 'Create' ? 'Crear categoria' : 'Editar categoria'} />
                                            <TitleFieldset 
                                                title={currentCategory?.title}
                                                onChange={TitleFieldsetOnChange}
                                            />
                                            {
                                                !showSubcategoriesFieldset && (
                                                    <AmountFieldset
                                                        title='Monto presupuestado'
                                                        amount={currentCategory?.amount}
                                                        onChange={AmountFieldsetOnChange}
                                                    />
                                                )
                                            }
                                            { showSubcategoriesFieldset && (
                                                    <>
                                                        <AmountFieldset
                                                            titleElement='Monto presupuestado'
                                                            className=' bg-greenYellow text-black rounded-lg'
                                                            amount={currentCategory?.amount}
                                                            readOnly={true}
                                                            />
                                                        <MessageInfo
                                                            message='El monto presupuestado será el total de la suma de las subcategorias'
                                                            />
                                                    </>
                                            )}
                                            { type === 'Edit' && (
                                                    <ActionButton 
                                                        title='Eliminar esta categoria'
                                                        type='delete'
                                                        onClick={handleClickDeleteCategory}
                                                    />
                                            )}
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
                                                        
                                                        { currentCategory?.subcategories?.map((subCategory) => {
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
                                                                            <button onClick={(event) => deleteSubcategoryHandleClick(event, subCategory.id)}>X</button>
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

export default CategoryModal