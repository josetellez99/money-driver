import React from 'react'

import ActionButton from '@/components/ActionButton'
import PopUpLayer from '@/components/PopupLayer'
import BorderDiv from '@/components/BorderDiv'
import ElementTitle from '@/components/ElementTitle'
import TitleFieldset from '@/components/FormRegister/TitleFieldset'
import AmountFieldset from '@/components/FormRegister/AmountFieldset'
import SubmitButton from '@/components/FormRegister/SubmitButton'
import MessageInfo from '@/components/MessageInfo'

import styles from '@/components/Budget/Budget.module.css'
import formatMoney from '@/utils/formatMoney'
import {extractNumberFromString} from '@/utils/formatMoney'

interface EditCategoryModalProps {
    setShowEditCategoryModal: React.Dispatch<React.SetStateAction<boolean>>;
    categoryTitle: string;
    categoryAmount: number;
    setComposeState: React.Dispatch<React.SetStateAction<BudgetItem[] | undefined>>;
    itemID: number;
    setShowConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
    children?: React.ReactNode;
    subCategories?: BudgetItem[];
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
    setShowEditCategoryModal,
    categoryTitle,
    categoryAmount,
    setComposeState,
    itemID,
    setShowConfirmationModal,
    children,
    subCategories,
}) => {

    // The state of the fieldset that show the subcategories inputs
    const [showSubcategoriesFieldset, setShowSubcategoriesFieldset] = React.useState<boolean>(subCategories ? true : false)

    // subCategoriesState can't be undefined because we need to map it when the showSubcategoriesFieldset is true
    // if(showSubcategoriesFieldset && !subCategories) {


    //     setComposeState((prevState) => {
    //         const newState = prevState?.map((category) => {
    //             if (category.id === itemID) {
    //                 category.subcategories?.map((subcategory) => {
    //                     if (subcategory.id === subcategoryID) {
    //                         return {
    //                             ...subcategory,
    //                             amount: value
    //                         };
    //                     }
    //                     return subcategory;
    //                 })
    //             }
    //         })
    //         return newState;
    //     })


        // setSubCategoriesState([{
        //     id: Math.floor(Math.random() * (1100 - 1003 + 1)) + 1003,
        //     category: '',
        //     amount: 0
        // }])


    //     setComposeState((prevState) => {
    //         const newState = prevState?.map((category) => {
    //             if (category.id === itemID) {
    //                 category.subcategories?.map((subcategory) => {
    //                     if(subcategory.id === 1) {
    //                         return {
    //                             ...subcategory,
    //                             category: '',
    //                             amount: 0
    //                     }
    //                     }
    //                 })
    //             }
    //         })
    //     })
    

    // But we need to hide the subcategories fieldset when the subcategoriesState is empty
    // The useEffect avoid an infinity loop when the subcategoriesState is empty
    React.useEffect(() => {
        if (subCategories?.length === 0) {
            setShowSubcategoriesFieldset(false);
        }
    }, [subCategories]);


    const totalSubcategoriesAmount = subCategories?.reduce((acc, subcategory) => {
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
    }

    // const handleAddNewSubcategory = () => {
    //     setComposeState((prevState) => {
    //         const newState = prevState?.map((category) => {
    //             if (category.id === itemID) {
    //                 category.subcategories = category.subcategories ? [...category.subcategories] : []
    //                 category.subcategories = [...category.subcategories]
    //                 category.subcategories.push({
    //                     id: Math.floor(Math.random() * (1100 - 1003 + 1)) + 1003,
    //                     title: '',
    //                     amount: 0,
    //                     used: 0,
    //                     remaining: 0
    //                 })
    //             }
    //             return category;
    //         })
    //         return newState;
    //     })
    // }

    const handleAddNewSubcategory = () => {
        setComposeState((prevState) => {
            const newState = prevState?.map((category) => {
                if (category.id === itemID) {
                    const subcategories = 
                        category.subcategories
                            ? category.subcategories.map((subcategory) => ({ ...subcategory })) 
                            : [];
                    subcategories?.push({
                        id: Math.floor(Math.random() * (1100 - 1003 + 1)) + 1003,
                        title: '',
                        amount: 0,
                        used: 0,
                        remaining: 0
                    });
                    category.subcategories = subcategories;
                }
                
                return category;
            });
            return newState;
        });
    };

    const handleDeleteAllSubcategories = () => {
        setComposeState((prevState) => {
            const newState = prevState?.map((category) => {
                if (category.id === itemID) {
                    category.subcategories = []
                }
                return category;
            })
            return newState;
        })
    }

    const handleClickDeleteCategory = () => {
        setShowConfirmationModal(true)
    }

    const handleClickInputText = (event: React.ChangeEvent<HTMLInputElement>, subcategoryID: number) => {
        const { value } = event.target;
        setComposeState((prevState) => {
            const newState = prevState?.map((category) => {
                if (category.id === itemID) {
                    const subcategories = category.subcategories?.map((subcategory) => {
                        if (subcategory.id === subcategoryID) {
                            return {
                                ...subcategory,
                                title: value
                            };
                        }
                        return subcategory;
                    });
                    category.subcategories = subcategories;
                }
                return category;
            });
            return newState;
        });
    };

    const handleClickInputNumber = (event: React.ChangeEvent<HTMLInputElement>, subcategoryID: number) => {
        const { value } = event.target;
        const valueAsNumber = extractNumberFromString(value);

        setComposeState((prevState) => {
            const newState = prevState?.map((category) => {
                if (category.id === itemID) {
                    const subcategories = category.subcategories?.map((subcategory) => {
                        if (subcategory.id === subcategoryID) {
                            return {
                                ...subcategory,
                                amount: valueAsNumber
                            };
                        }
                        return subcategory;
                    });
                    category.subcategories = subcategories;
                }
                return category;
            });
            return newState;
        });
    };

    const deleteSubcategoryHandleClick = () => {
        setComposeState((prevState) => {
            const newState = prevState?.map((category) => {
                if (category.id === itemID) {
                    category.subcategories = category.subcategories?.filter((subcategory) => {
                        return subcategory.id !== 1;
                    });
                }
                return category;
            });
            return newState;
        });
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
                                                title={categoryTitle}
                                                setComposeState={setComposeState}
                                                itemID={itemID}
                                            />
                                            {
                                                !showSubcategoriesFieldset && (
                                                    <AmountFieldset
                                                        title='Monto presupuestado'
                                                        amount={categoryAmount}
                                                        setComposeState={setComposeState}
                                                    />
                                                )
                                            }
                                            {
                                                showSubcategoriesFieldset && (
                                                    <>
                                                        <AmountFieldset
                                                            title='Monto presupuestado'
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
                                            {
                                                !showSubcategoriesFieldset && (
                                                    <div className='flex justify-end'>
                                                        <ActionButton 
                                                            title='Agregar subcategoria'
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
                                                        
                                                        {
                                                            subCategories?.map((subCategory) => {
                                                                return (
                                                                    <>
                                                                            <div className='flex justify-between items-center gap-4 mb-1'>
                                                                                <input 
                                                                                    type="text"
                                                                                    className={`${styles.subCategoriesInput} border-1 px-2 bg-backgroundBlue border-b-greenYellow w-2/4 `}
                                                                                    value={subCategory.title}
                                                                                    onChange={(event) => handleClickInputText(event, subCategory.id)}
                                                                                />
                                                                                <input 
                                                                                    type="text"
                                                                                    className={`${styles.subCategoriesInput} border-1 px-2 bg-backgroundBlue border-b-greenYellow w-2/4 text-end`}
                                                                                    value={formatMoney(subCategory.amount)}
                                                                                    onChange={(event) => handleClickInputNumber(event, subCategory.id)}
                                                                                />
                                                                                <button onClick={deleteSubcategoryHandleClick}>X</button>
                                                                            </div>
                                                                            {/* <EditSubcategoryInput
                                                                                key={subCategory.id}
                                                                                subcategoryID={subCategory.id}
                                                                                itemID={itemID}
                                                                                subCategoryTitle={subCategory.title}
                                                                                subCategoryAmount={subCategory.amount}
                                                                                setComposeState={setComposeState}
                                                                            /> */}
                                                                    </>
                                                                )
                                                            })
                                                        }

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
                    {children}
        </>
    )
}

export default EditCategoryModal