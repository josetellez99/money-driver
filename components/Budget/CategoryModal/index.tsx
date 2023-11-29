// import React, { ChangeEvent } from 'react'

// import ActionButton from '@/components/ActionButton'
// import PopUpLayer from '@/components/PopupLayer'
// import BorderDiv from '@/components/BorderDiv'
// import ElementTitle from '@/components/ElementTitle'
// import TitleFieldset from '@/components/FormRegister/TitleFieldset'
// import AmountFieldset from '@/components/FormRegister/AmountFieldset'
// import SubmitButton from '@/components/FormRegister/SubmitButton'
// import MessageInfo from '@/components/MessageInfo'
// import ConfirmationModal from '@/components/ConfirmationModal'

// import SectionSubcategories from '@/components/Budget/CategoryModal/SectionSubcategories'

// interface CategoryModalProps {
//     setShowCategoryModal: React.Dispatch<React.SetStateAction<boolean>>;
//     showConfirmationModal: boolean;
//     setShowConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
//     currentCategory: BudgetItem | undefined;
//     setCurrentCategory: React.Dispatch<React.SetStateAction<BudgetItem | undefined>>;
//     setBudgetData: React.Dispatch<React.SetStateAction<BudgetItem[]>>;
//     actionType: 'Create' | 'Edit';
// }

// const CategoryModal: React.FC<CategoryModalProps> = ({
//     setShowCategoryModal,
//     showConfirmationModal,
//     setShowConfirmationModal,
//     currentCategory,
//     setCurrentCategory,
//     setBudgetData,
//     actionType
// }) => {

//     // The state of the fieldset that show the subcategories inputs
//     const [showSubcategoriesFieldset, setShowSubcategoriesFieldset] = React.useState<boolean>(currentCategory?.subcategories ? true : false)

//     const handleClickClosePopUp = () => {
//         setShowCategoryModal(false)
//         setCurrentCategory(undefined)   
//     }

//     const handleShowSubcategoriesFieldset = () => {
//         setShowSubcategoriesFieldset(true)
//         setCurrentCategory((currentCategory) => {
//             const newSubcategory = {
//                 id: Math.floor(Math.random() * (1100 - 1003 + 1)) + 1003,
//                 title: '',
//                 amount: 0,
//                 used: 0,
//                 remaining: 0
//             };
//             const subcategories = currentCategory?.subcategories || [];
//             const newSubcategories = [...subcategories, newSubcategory];

//             const newCurrentCategory = {
//                 ...currentCategory,
//                 amount: 0,
//                 subcategories: newSubcategories
//             }
//             return newCurrentCategory
//         });
//     }

//     const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault()

//         if (actionType === 'Create') {
//             setBudgetData((prevState) => {
//                 const newState = [...prevState, currentCategory]
//                 return newState
//             })
//             setCurrentCategory(undefined)
//         }
//         if (actionType === 'Edit') {
//             setBudgetData((prevState) => {
//                 const newState = prevState?.map((category) => {
//                     if (category.id === currentCategory?.id) {
//                         return currentCategory
//                     }
//                     return category
//                 })
//                 return newState
//             })
//         }

//         setShowCategoryModal(false)
//         setCurrentCategory(undefined)
//     }

//        //This use effect is to make sure that the fieldset is not shown when the subcategories array is empty
//     React.useEffect(() => {
//         if(currentCategory?.subcategories?.length === 0) {
//             setShowSubcategoriesFieldset(false)
//         }
//     }, [currentCategory?.subcategories])


//     const confirmationMondalDeletecategory = [
//         {
//             title: 'Si',
//             id: 1,
//             onClick: () => {
//                 setShowCategoryModal(false)
//                 setShowConfirmationModal(false)
//                 setBudgetData((prevState) => {
//                     const newState = prevState?.filter((category) => {
//                         return category.id !== currentCategory?.id
//                     })
//                     return newState;
//                 })
//             },
            
//         },
//         {
//             title: 'No',
//             id: 2,
//             onClick: () => {
//                 setShowConfirmationModal(false)
//             }
//         }
//     ]

//     const handleClickDeleteCategory = () => {
//         setShowConfirmationModal(true)
//     }


//     const TitleFieldsetOnChange = (event: ChangeEvent<HTMLInputElement>) => {
//         const { value } = event.target;
//             setCurrentCategory((currentCategory) => {
//                 return {
//                     ...currentCategory,
//                     title: value,
//                 }
//             })
//     }

//     const AmountFieldsetOnChange = (value: number) => {
//         setCurrentCategory((currentCategory) => {
//             return {
//                 ...currentCategory,
//                 amount: value
//             }
//         })
//     }


//     return (
//         <>
//             <PopUpLayer>
//                 <div className='flex flex-col w-full '>
//                     <button onClick={handleClickClosePopUp}>x</button>
//                     <form action="" onSubmit={handleSubmit}>
//                         <BorderDiv
//                             className='bg-backgroundBlue'
//                             >
//                                 <div className='py-2'>
//                                     <ElementTitle title={actionType === 'Create' ? 'Crear categoria' : 'Editar categoria'} />
//                                     <TitleFieldset 
//                                         title={currentCategory?.title}
//                                         onChange={TitleFieldsetOnChange}
//                                     />
//                                     { !showSubcategoriesFieldset && (
//                                         <>
//                                             <AmountFieldset
//                                                 title='Monto presupuestado'
//                                                 amount={currentCategory?.amount}
//                                                 onChange={AmountFieldsetOnChange}
//                                             />
//                                             <div className='flex justify-end'>
//                                                 <ActionButton 
//                                                     title='Crear Subcategorias'
//                                                     type='add'
//                                                     onClick={handleShowSubcategoriesFieldset}
//                                                     />
//                                             </div>
//                                         </>
//                                         )}
//                                     { showSubcategoriesFieldset && (
//                                             <>
//                                                 <AmountFieldset
//                                                     titleElement='Monto presupuestado'
//                                                     className=' bg-greenYellow text-black rounded-lg'
//                                                     amount={currentCategory?.amount}
//                                                     readOnly={true}
//                                                 />
//                                                 <MessageInfo
//                                                     message='El monto presupuestado será el total de la suma de las subcategorias'
//                                                 />
//                                                 <SectionSubcategories 
//                                                     currentCategory={currentCategory!}
//                                                     setCurrentCategory={setCurrentCategory}
//                                                     setShowSubcategoriesFieldset={setShowSubcategoriesFieldset}
//                                                 />
//                                             </>
//                                     )}
//                                     { actionType === 'Edit' && (
//                                             <ActionButton 
//                                                 title='Eliminar esta categoria'
//                                                 type='delete'
//                                                 onClick={handleClickDeleteCategory}
//                                             />
//                                     )}
//                                         { showConfirmationModal && (
//                                             <ConfirmationModal
//                                                 buttonsData={confirmationMondalDeletecategory}
//                                                 message='¿Estas seguro que quieres eliminar esta categoria?'
//                                             />
//                                         )}
//                                     <SubmitButton 
//                                         title='Guardar'
//                                     />
//                                 </div>
//                         </BorderDiv>
//                     </form>
//                 </div>
//             </PopUpLayer>
//         </>
//     )
// }

// export default CategoryModal