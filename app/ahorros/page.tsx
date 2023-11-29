import ElementTitle from "@/components/ElementTitle"
import DownBar from '@/components/DownBar'
import MainDefault from "@/components/MainDefault"

export default function SavingPage () {
    return (
        <>
            <MainDefault
                paddingForDownBar={true}
            >
                <ElementTitle title='Comming soon...' />
                <DownBar />
            </MainDefault>
        </>
    )
}