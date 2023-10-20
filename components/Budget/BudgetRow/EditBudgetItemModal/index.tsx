import React from 'react'

import ActionButton from '@/components/ActionButton'
import PopUpLayer from '@/components/PopupLayer'
import BorderDiv from '@/components/BorderDiv'
import ElementTitle from '@/components/ElementTitle'
import TitleFieldset from '@/components/FormRegister/TitleFieldset'
import AmountFieldset from '@/components/FormRegister/AmountFieldset'
import SubmitButton from '@/components/FormRegister/SubmitButton'
import ConfirmActionModal from '@/components/ConfirmActionModal'
import MessageInfo from '@/components/MessageInfo'

import SubcategoriesBudgetFieldset from '@/components/Budget/SubcategoriesFieldset'

interface EditBudgetItemModalProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    categoryState: string | undefined;
    setCategoryState: React.Dispatch<React.SetStateAction<string | undefined>>;
    amountState: number | undefined;
    setAmountState: React.Dispatch<React.SetStateAction<number | undefined>>;
    subCategoriesState: BudgetItem[] | undefined;
    setSubCategoriesState: React.Dispatch<React.SetStateAction<BudgetItem[] | undefined>>;
}

const EditBudgetItemModal: React.FC<EditBudgetItemModalProps> = ({
    setShowModal, 
    categoryState,
    setCategoryState,
    amountState,
    setAmountState,
    subCategoriesState,
    setSubCategoriesState
}) => {

    // The state of the modal that show the confirmation message when the user click on the delete button
    const [showConfirmActionModal, setShowConfirmActionModal] = React.useState<boolean>(false)

    // The state of the fieldset that show the subcategories inputs
    const [showSubcategoriesFieldset, setShowSubcategoriesFieldset] = React.useState<boolean>(subCategoriesState ? true : false)

    // subCategoriesState can't be undefined because we need to map it when the showSubcategoriesFieldset is true
    if(showSubcategoriesFieldset && !subCategoriesState) {
        setSubCategoriesState([{
            id: Math.floor(Math.random() * (1100 - 1003 + 1)) + 1003,
            category: '',
            amount: 0
        }])
    }

    // But we need to hide the subcategories fieldset when the subcategoriesState is empty
    // The useEffect avoid an infinity loop when the subcategoriesState is empty
    React.useEffect(() => {
        if (subCategoriesState?.length === 0) {
            setShowSubcategoriesFieldset(false);
        }
    }, [subCategoriesState]);


    const totalSubcategoriesAmount = subCategoriesState?.reduce((acc, subcategory) => {
        return acc + subcategory.amount
    }, 0)

    // The data for the confirmation modal buttons
    const confirmationMondalButtonsData = [
        {
            title: 'Si',
            id: 1,
            onClick: () => {
                setShowModal(false)
                setShowConfirmActionModal(false)
            },
            
        },
        {
            title: 'No',
            id: 2,
            onClick: () => {
                setShowConfirmActionModal(false)
            }
        }
    ]

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    const handleAddNewSubcategory = () => {
        setSubCategoriesState((prevState) => {
            const newSubcategory: BudgetItem = {
                id: Math.floor(Math.random() * (1100 - 1003 + 1)) + 1003,
                category: '',
                amount: 0
            }
            const newState = [...prevState, newSubcategory]
            return newState
        });
    }

    const handleClickDeleteCategory = () => {
        setShowConfirmActionModal(true)
    }

    const handleClickClosePopUp = () => {
        setShowModal(false)
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
                                                title={categoryState}
                                                setTitle={setCategoryState}
                                            />
                                            {
                                                !showSubcategoriesFieldset && (
                                                    <AmountFieldset
                                                        title='Monto presupuestado'
                                                        amount={amountState}
                                                        setAmount={setAmountState}
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
                                                            onClick={() => setShowSubcategoriesFieldset(true)}
                                                        />
                                                    </div>
                                                )
                                            }
                                            { showSubcategoriesFieldset && (
                                                <SubcategoriesBudgetFieldset
                                                    addNewSubcategory={handleAddNewSubcategory}
                                                    setShowSubcategoriesFieldset={setShowSubcategoriesFieldset}
                                                    subCategoriesState={subCategoriesState}
                                                    setSubCategoriesState={setSubCategoriesState}
                                                />
                                        )}
                                            <SubmitButton 
                                                title='Guardar'
                                            />
                                        </div>
                                </BorderDiv>
                            </form>
                            
                        </div>
                    </PopUpLayer>
                    {showConfirmActionModal && (
                        <ConfirmActionModal 
                            message='¿Estas seguro que quieres eliminar esta categoria?'
                            buttonsOptions={confirmationMondalButtonsData}
                        />
                    )}
        </>
    )
}

export default EditBudgetItemModal