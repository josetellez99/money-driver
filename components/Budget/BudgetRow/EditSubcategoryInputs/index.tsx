import { extractNumberFromString } from '@/utils/formatMoney'
import React from 'react'
import formatMoney from '@/utils/formatMoney';
import styles from '@/components/Budget/Budget.module.css'

interface EditSubcategoryInputProps {
    subcategoryID: number;
    itemID: number;
    subCategoryTitle: string;
    subCategoryAmount: number;
    setComposeState: React.Dispatch<React.SetStateAction<BudgetItem[] | undefined>>;
}

const EditSubcategoryInput: React.FC<EditSubcategoryInputProps> = ({
    subcategoryID,
    itemID,
    subCategoryTitle, 
    subCategoryAmount, 
    setComposeState }) => {

    const handleClickInputText = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        setComposeState((prevState) => {
            const newState = prevState?.map((category) => {
                if (category.id === itemID) {
                    console.log('entramos al if')
                    console.log(category.subcategories)
                    category.subcategories?.map((subcategory) => {
                        console.log(subcategory)
                        if (subcategory.id === subcategoryID) {
                            console.log('entramos al if 2')
                            return {
                                ...subcategory,
                                title: value
                            };
                        }
                        return subcategory;
                    })
                }
                return category;
            })
            return newState;
        })

        // setComposeState((prevState) => {
        //     const newState = prevState?.map((subcategory) => {
        //         if (subcategory.id === subcategoryID) {
        //             return {
        //                 ...subcategory,
        //                 category: value
        //             };
        //         }
        //         return subcategory;
        //     });
        //     return newState;
        // });

    };

    const handleClickInputNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        
        const { value } = event.target;
        const valueAsNumber = extractNumberFromString(value);

        setComposeState((prevState) => {
            const newState = prevState?.map((category) => {
                if (category.id === subcategoryID) {
                    category.subcategories?.map((subcategory) => {
                        if (subcategory.id === subcategoryID) {
                            return {
                                ...subcategory,
                                amount: value
                            };
                        }
                        return subcategory;
                    })
                    return newState;
                }
            })
        })

        // setComposeState((prevState) => {
        //     const newState = prevState?.map((subcategory) => {
        //         if (subcategory.id === subcategoryID) {
        //             return {
        //                 ...subcategory,
        //                 amount: Number(valueAsNumber)
        //             };
        //         }
        //         return subcategory;
        //     });
        //     return newState;
        // });
    };

    const deleteSubcategoryHandleClick = () => {


        setComposeState((prevState) => {
            const newState = prevState?.map((category) => {
                if (category.id === subcategoryID) {
                    category.subcategories?.filter((subcategory) => {
                        return subcategory.id !== subcategoryID;
                    })
                    return newState;
                }
            })
        })



        // setSubcategoryState((prevState) => {
        //     const newState = prevState?.filter((subcategory) => {
        //         return subcategory.id !== subcategoryID;
        //     });
        //     return newState;
        // });
    }

    return (
        <>
            <div className='flex justify-between items-center gap-4 mb-1'>
                <input 
                    type="text"
                    className={`${styles.subCategoriesInput} border-1 px-2 bg-backgroundBlue border-b-greenYellow w-2/4 `}
                    value={subCategoryTitle}
                    onChange={handleClickInputText}
                />
                <input 
                    type="text"
                    className={`${styles.subCategoriesInput} border-1 px-2 bg-backgroundBlue border-b-greenYellow w-2/4 text-end`}
                    value={formatMoney(subCategoryAmount)}
                    onChange={handleClickInputNumber}
                />
                <button onClick={deleteSubcategoryHandleClick}>X</button>
            </div>
        </>
    )
}

export default EditSubcategoryInput