import FieldsetTitle from "@/components/FormRegister/FieldsetTitle"
import RegularButton from "@/components/RegularButton"


interface ToggleButtonsFieldsetProps {
    activeRegisterOption: string,
    activeToggleButton: string,
    setActiveToggleButton: React.Dispatch<React.SetStateAction<string>>

}

const ToggleButtonsFieldset: React.FC<ToggleButtonsFieldsetProps> = ({activeRegisterOption, activeToggleButton, setActiveToggleButton}) => {

    let titles = ['']

    if(activeRegisterOption === 'Deuda') {
        titles = ['Me pagaron', 'Pagué']
    } else if (activeRegisterOption === 'Ahorro') {
        titles = ['Agregué dinero', 'Saqué dinero']
    }

    if(activeRegisterOption === 'Ingreso' || activeRegisterOption === 'Egreso' || activeRegisterOption === 'Movimiento') {
        return null
    } else {
        return (
            <>
            <fieldset className="flex justify-center gap-1">
                <FieldsetTitle title='Tipo de movimiento' />
                {
                    titles.map( (title : string) => (
                        <RegularButton 
                            title={title}
                            isActive={title === activeToggleButton} 
                            setActive={setActiveToggleButton}
                        />
                    ))
                }
            </fieldset>
            </>
        )
    }
}

export default ToggleButtonsFieldset