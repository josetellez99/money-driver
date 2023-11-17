
import MainDefault from '@/components/MainDefault';
import BackButton from '@/components/BackButton';
import {fetchSingleBudgetCategoryWithSubcategories} from '@/app/lib/action'
import EditForm from '@/components/Budget/EditForm';


const EditBudgetCategoryPage = async ({params} : {params : {
    budgetID: string,
}}) => {

    const { budgetID } = params;
    const currentCategoryWithSubcategories = await fetchSingleBudgetCategoryWithSubcategories(budgetID)
    
    return (
        <MainDefault>
            <div className="flex flex-col w-full">
                <BackButton href='/presupuesto-cuentas' />
                <EditForm
                    currentCategory={currentCategoryWithSubcategories}
                />

            </div>
        </MainDefault>
    )
}

export default EditBudgetCategoryPage