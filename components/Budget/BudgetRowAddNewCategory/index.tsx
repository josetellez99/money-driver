import React from 'react'
import styles from '@/components/Budget/Budget.module.css'
import CreateNewCategoryModal from '@/components/Budget/BudgetRowAddNewCategory/CreateNewCategoryModal'

const BudgetRowAddNewCategory = () => {

    const [showModal, setShowModal] = React.useState<boolean>(false)


    const handleClick = () => {
        setShowModal(true)
    }

    return (
        <>
            <tr 
                className={`${styles.tableRowNewCategoryLayout} border-2 border-greenYellow rounded-lg my-2 cursor-pointer`}
                onClick={handleClick} 
            >
                <td className='border-greenYellow px-2 font-bold'>Añadir nueva categoria...</td>
            </tr>
            {
                showModal && (
                    <>
                        <CreateNewCategoryModal 
                            setShowModal={setShowModal}
                        />
                    </>
                )
            }
        </>
    )
}

export default BudgetRowAddNewCategory