import React from "react"

interface RegularButtonListProps {
    className?: string;
    children: React.ReactNode
}

const RegularButtonList: React.FC<RegularButtonListProps> = ({className, children}) => {

    return (
        <>
            <ul className={`flex gap-1 justify-center my-2 ${className}`}>
                {children}
            </ul>
        </>
    )
}

export default RegularButtonList