// import React from 'react'
// import ElementTitle from '@/components/ElementTitle'
// import ActionButton from '@/components/ActionButton'
// import styles from '@/components/Budget/Budget.module.css'

// import formatMoney from '@/utils/formatMoney'
// import {extractNumberFromString} from '@/utils/formatMoney'

// interface SectionSubcategoriesProps {
//     currentCategory: BudgetItem;
//     setCurrentCategory: React.Dispatch<React.SetStateAction<BudgetItem>>;
//     setShowSubcategoriesFieldset: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const SectionSubcategories: React.FC<SectionSubcategoriesProps> = ({
//     currentCategory,
//     setCurrentCategory,
//     setShowSubcategoriesFieldset
// }) => {

//     const handleAddNewSubcategory = () => {
//         setCurrentCategory((currentCategory: any) => {
//             const newSubcategory = {
//                 id: Math.floor(Math.random() * (1300 - 1000 + 1)) + 1000,
//                 title: '',
//                 amount: 0,
//                 used: 0,
//                 remaining: 0,
//             };
//             const subcategories = currentCategory?.subcategories || [];
//             const newSubcategories = [...subcategories, newSubcategory];
//             return {
//                 ...(currentCategory || {}), // Ensure currentCategory is not undefined
//                 subcategories: newSubcategories,
//             };
//         });
//     };
    
//     const handleOnChangeInputTitleSubcategory = (event: React.ChangeEvent<HTMLInputElement>, subcategoryID: string) => {
//         const { value } = event.target;
//         setCurrentCategory((currentCategory) => {
//             const newSubcategories = currentCategory?.subcategories?.map((subcategory) => {
//                 if (subcategory.id === subcategoryID) {
//                     return { ...subcategory, title: value };
//                 }
//                 return subcategory;
//             });
//             return { ...currentCategory, subcategories: newSubcategories };
//         });
//     };

//     const handleOnChangeInputAmountSubcategory = (event: React.ChangeEvent<HTMLInputElement>, subcategoryID: string) => {
//         const { value } = event.target;
//         setCurrentCategory((currentCategory : any) => {
//             const newSubcategories = currentCategory?.subcategories?.map((subcategory: BudgetItem) => {
//                 if (subcategory.id === subcategoryID) {
//                     return { ...subcategory, amount: extractNumberFromString(value) };
//                 }
//                 return subcategory;
//             });

//             const totalSubcategoriesAmount = newSubcategories?.reduce((acc: number, subcategory: BudgetItem) => {
//                 return acc + subcategory.amount
//             }, 0)

//             const newCurrentCategory = {
//                 ...currentCategory,
//                 amount: totalSubcategoriesAmount,
//                 subcategories: newSubcategories
//             }
//             return newCurrentCategory;
//         });
//     };

//     const deleteSubcategoryHandleClick = (event: React.MouseEvent<HTMLButtonElement>, subcategoryID : string) => {
//         event.preventDefault();
//         setCurrentCategory((currentCategory) => {
//             const newSubcategories = currentCategory?.subcategories?.filter((subcategory) => {
//                 return subcategory.id !== subcategoryID;
//             });
//             return { ...currentCategory, subcategories: newSubcategories };
//         });
//     }

//     const handleDeleteAllSubcategories = () => {
//         setCurrentCategory((currentCategory) => {
//             return {
//                 ...currentCategory,
//                 subcategories: []
//             }
//         })
//         setShowSubcategoriesFieldset(false)
//     }


//     return (
//         <>
//             <fieldset className='my-4'>
//                 <ElementTitle
//                     title='Subcategorias'
//                 />
//                 <div className='flex justify-between gap-4 mb-1' >
//                     <h3>Titulo</h3>
//                     <h3>Monto presupuestado</h3>
//                 </div>
//                 { currentCategory.subcategories?.map((subCategory) => (
//                     <div 
//                         key={subCategory.id}
//                         className='flex justify-between items-center gap-4 mb-1'
//                     >
//                         <input 
//                             type="text"
//                             className={`${styles.subCategoriesInput} border-1 px-2 bg-backgroundBlue border-b-greenYellow w-2/4 `}
//                             value={subCategory.title}
//                             onChange={(event) => handleOnChangeInputTitleSubcategory(event, subCategory.id!)}
//                         />
//                         <input 
//                             type="text"
//                             className={`${styles.subCategoriesInput} border-1 px-2 bg-backgroundBlue border-b-greenYellow w-2/4 text-end`}
//                             value={formatMoney(subCategory.amount)}
//                             onChange={(event) => handleOnChangeInputAmountSubcategory(event, subCategory.id!)}
//                         />
//                         <button onClick={(event) => deleteSubcategoryHandleClick(event, subCategory.id!)}>X</button>
//                     </div>
//                 ))}
//             </fieldset>
//             <div className='flex flex-col items-end mt-2'>
//                 <ActionButton
//                     title='Añadir subcategoria'
//                     type='add'
//                     onClick={handleAddNewSubcategory}
//                 />
//                 <ActionButton 
//                     title='Eliminar todas las subcategorias'
//                     type='delete'
//                     onClick={handleDeleteAllSubcategories}
//                 />
//             </div>
//         </>
//     )
// }

// export default SectionSubcategories