import React from "react"
import FormRegister from "@/components/FormRegister"
import MainDefault from "@/components/MainDefault"
import useNavigation from "next/navigation"

interface RegisterPageProps {
    params: {
        slug: string
    }
}

const RegisterPage: React.FC<RegisterPageProps> = ( {params} ) => {

    // const router = useNavigation()
    console.log(useNavigation)
    return (
        <>
        <MainDefault>
            <FormRegister activeOption={params.slug} />
        </MainDefault>
        </>
    )
}

export default RegisterPage