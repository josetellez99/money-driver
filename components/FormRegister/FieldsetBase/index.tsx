interface FieldsetBaseProps {
    children: React.ReactNode
    className?: string
}

const FieldsetBase: React.FC<FieldsetBaseProps> = ({ children, className }) => {

    return (
        <fieldset className={`w-full items-center flex my-2 flex-wrap gap-2 ${className}`}>
            {children}
        </fieldset>
    )
}

export default FieldsetBase