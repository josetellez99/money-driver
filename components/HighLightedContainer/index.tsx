interface HighLightedContainerProps {
    children: React.ReactNode,
    className?: string
}

const HighLightedContainer: React.FC<HighLightedContainerProps> = ({ children, className }) => {
    return (
        <div className={`${className} flex items-center my-2 bg-greenYellow py-2 p-1 rounded-md`}>
            {children}
        </div>
    )
}

export default HighLightedContainer;