interface HighLightedContainerProps {
    children: React.ReactNode,
    className?: string
    inTable?: boolean
}

const HighLightedContainer: React.FC<HighLightedContainerProps> = ({ children, className, inTable }) => {
    return (
        <>
            { inTable && (
                <tr className={`${className} flex items-center my-2 bg-greenYellow py-2 p-1 rounded-md`}>
                    {children}
                </tr>
            )}
            { !inTable && (
                <div className={`${className} flex items-center my-2 bg-greenYellow py-2 p-1 rounded-md`}>
                    {children}
                </div>
            )}
        </>
    )
}

export default HighLightedContainer;