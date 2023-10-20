import React from "react"

interface RegularButtonListProps {
    children: React.ReactNode
}

const RegularButtonList: React.FC<RegularButtonListProps> = ({children}) => {

    return (
        <>
            <ul className="flex gap-1 justify-center my-2">
                {children}
            </ul>
        </>
    )
}

export default RegularButtonList