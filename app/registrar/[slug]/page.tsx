import React from "react"
import FormRegister from "@/components/FormRegister"
import MainDefault from "@/components/MainDefault"
import Link from "next/link";
import {fetchUserAccounts, fetchUserBudgetWithSubcategories} from "@/app/lib/action";

interface RegisterPageProps {
    params: {
        slug: string
    }
}

const RegisterPage: React.FC<RegisterPageProps> = async ( {params} ) => {

    const [accounts, incomesCategories, expensesCategories] = await Promise.all([
        fetchUserAccounts(),
        fetchUserBudgetWithSubcategories('income'),
        fetchUserBudgetWithSubcategories('expense'),
    ])

    // We need to translate the slug to the type of register that the server expects in english
    
    const optionsMap: { [key: string]: string } = {
        'Ingreso': 'income',
        'Egreso': 'expense',
        'Movimiento': 'movement',
        'Deuda': 'debt',
        'Tarjeta de credito': 'creditCard'
    };

    const option = optionsMap[params.slug];

    return (
        <>
        <MainDefault>
            <Link 
                href='/presupuesto-cuentas'
                className="block mb-4 text-greenYellow font-bold"
            >
                Ir a presupuesto y cuentas
            </Link>
            <FormRegister
                activeRegisterOption={option}
                accounts={accounts}
                incomesCategories={incomesCategories}
                expensesCategories={expensesCategories}
                // debts={debts}
                // saves={saves},
                // creditCards={creditCards}
            />
        </MainDefault>
        </>
    )
}

export default RegisterPage