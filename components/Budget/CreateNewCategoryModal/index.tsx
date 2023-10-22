import React from 'react'

import ActionButton from '@/components/ActionButton'
import PopUpLayer from '@/components/PopupLayer'
import BorderDiv from '@/components/BorderDiv'
import ElementTitle from '@/components/ElementTitle'
import TitleFieldset from '@/components/FormRegister/TitleFieldset'
import AmountFieldset from '@/components/FormRegister/AmountFieldset'
import SubmitButton from '@/components/FormRegister/SubmitButton'
import MessageInfo from '@/components/MessageInfo'

import SubcategoriesBudgetFieldset from '@/components/Budget/SubcategoriesFieldset'

interface CreateNewCategoryModalProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateNewCategoryModal: React.FC<CreateNewCategoryModalProps> = ({setShowModal}) => {

    //All the forms collect the data into react states and then send it to the backend

    const[categoryTitle, setCategoryTitle] = React.useState<string | undefined>('')
    const[categoryAmount, setCategoryAmount] = React.useState<number | undefined>(0)

    // This state handle the subcategories fieldset show/hide
    const[showSubcategoriesFieldset, setShowSubcategoriesFieldset] = React.useState<boolean>(false)

    // This state handle the subcategories "BudgetItems" objects state. Its initial value is a BudgetItem object with default values
    const[subCategoriesState, setSubCategoriesState] = React.useState<BudgetItem[] | undefined>([{
        id: Math.floor(Math.random() * (1100 - 1003 + 1)) + 1003,
        category: '',
        amount: 0
    }])

    const handleClickClosePopUp = () => {
        setShowModal(false)
    }
    
    const handleShowSubcategoryFieldset = () => {
        setShowSubcategoriesFieldset(true)
    }

    // This handler add a new empty BudgetItem object to the subcategories state and show the inputs
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

    const totalSubcategoriesAmount = subCategoriesState?.reduce((acc, subcategory) => {
        return acc + subcategory.amount
    }, 0)

    // If the subcategoriesState is empty, the subcategories fieldset is hidden.
    // The useEffect avoid an infinity loop when the subcategoriesState is empty
    React.useEffect(() => {
        if (subCategoriesState?.length === 0) {
            setShowSubcategoriesFieldset(false);
        }
    }, [subCategoriesState]);
    

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
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
                                        <ElementTitle title='Crear una nueva categoria' />
                                        <TitleFieldset 
                                            title={categoryTitle}
                                            setTitle={setCategoryTitle}
                                        />
                                        {
                                            !showSubcategoriesFieldset && (
                                                <>
                                                <AmountFieldset
                                                    title='Monto presupuestado'
                                                    amount={categoryAmount}
                                                    setAmount={setCategoryAmount}
                                                />
                                                    <ActionButton
                                                        title='Añadir subcategoria'
                                                        type='add'
                                                        onClick={handleShowSubcategoryFieldset}
                                                    />
                                                </>
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
        </>
    )
}

export default CreateNewCategoryModal