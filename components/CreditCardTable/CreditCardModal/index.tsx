import React from "react"

import PopUpLayer from "@/components/PopupLayer"
import BorderDiv from "@/components/BorderDiv"
import BackButton from '@/components/BackButton';

import ElementTitle from "@/components/ElementTitle";
import TitleFieldset from "@/components/FormRegister/TitleFieldset";
import AmountFieldset from "@/components/FormRegister/AmountFieldset";
import SubmitButton from "@/components/FormRegister/SubmitButton";
import MessageInfo from "@/components/MessageInfo";
import SummaryTransactionList from "@/components/SummaryTransactionList";
import Summarytransaction from "@/components/SummaryTransaction";
import ElementTitleSmall from "@/components/ElementTitleSmall";

interface CreditCardModalProps {
    typeOfCreditCardModal: 'create' | 'edit' | 'delete',
    currentCreditCard: CreditCardData,
    setCurrentCreditCard: React.Dispatch<React.SetStateAction<CreditCardData | undefined>>,
    setShowCreditCardModal: React.Dispatch<React.SetStateAction<boolean>>,
    setCreditsCardData : React.Dispatch<React.SetStateAction<CreditCardData[]>>
}

const CreditCardModal: React.FC<CreditCardModalProps> = ({
    typeOfCreditCardModal,
    currentCreditCard,
    setCurrentCreditCard,
    setShowCreditCardModal,
    setCreditsCardData,
}) => {

    const editHandleSubmit = () => {
        setCreditsCardData( creditsCardData => {
            const index = creditsCardData.findIndex(creditCard => creditCard.id === currentCreditCard.id)
            const newCreditsCardData = [...creditsCardData]
            newCreditsCardData[index] = currentCreditCard
            return newCreditsCardData
        })
    }

    const createHandleSubmit = () => {
        setCreditsCardData( creditsCardData => {
            return [...creditsCardData, currentCreditCard]
        })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        typeOfCreditCardModal === 'create' && createHandleSubmit()
        typeOfCreditCardModal === 'edit' && editHandleSubmit()

        setShowCreditCardModal(false);
    }

    const closeModalHanldeClick = () => {
        setShowCreditCardModal(false);
        setCurrentCreditCard({
            id: 0,
            title: '',
            used: 0,
        })
    }

    const titleOnChangeHandleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentCreditCard({...currentCreditCard, title: event.target.value})
    }

    return(
        <>
            <PopUpLayer>
                <div  className="flex flex-col w-full h-full">
                    <BackButton onClick={closeModalHanldeClick} />
                    <form onSubmit={handleSubmit}>
                        <BorderDiv
                            className="bg-backgroundBlue w-full"
                        >
                            <ElementTitle 
                                title={typeOfCreditCardModal === 'create' ? 'Agregar tarjeta de credito' : 'Editar tarjeta de credito'} 
                            />
                            <TitleFieldset 
                                title={currentCreditCard.title}
                                onChange={titleOnChangeHandleClick}
                            />
                            { typeOfCreditCardModal === 'create' && (
                                <MessageInfo 
                                    message="Asigna un nombre a la tarjeta de credito para mostrarla como medio de pago cuando registras un egreso. El monto usado se actualizará al realizar pagos con esta tarjeta."
                                />
                            )}
                            { typeOfCreditCardModal === 'edit' && (
                                <>
                                    <AmountFieldset
                                        amount={currentCreditCard.used}
                                        readOnly={true}
                                        className="bg-greenYellow text-black rounded"
                                    />
                                    <MessageInfo 
                                        message="El monto usado se actualiza al registrar un pago con esta tarjeta de credito."
                                    />
                                    <div className="my-6">
                                        <SummaryTransactionList 
                                            title="Transacciones"
                                        >
                                            {currentCreditCard.transactionsThisCohorte?.map( transaction => (
                                                <Summarytransaction
                                                    key={transaction.id}
                                                    transactionData={transaction}
                                                />
                                            ))}
                                        </SummaryTransactionList>
                                    </div>
                                </>
                            )}
                            <SubmitButton 
                                title="Guardar"
                            />
                        </BorderDiv>
                    </form>
                </div>
            </PopUpLayer>
        </>
    )
}

export default CreditCardModal