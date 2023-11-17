import MainDefault from '@/components/MainDefault';
import BackButton from '@/components/BackButton';
import CreateForm from '@/components/Budget/CreateForm';


const CreateBudgetCategoryPage = async ({params} : {params : {
    type: string,
}}) => {

    const { type } = params;

    return (
        <MainDefault>
            <div className="flex flex-col w-full">
                <BackButton href='/presupuesto-cuentas' />
                <CreateForm
                    type={type}
                />

            </div>
        </MainDefault>
    )
}

export default CreateBudgetCategoryPage