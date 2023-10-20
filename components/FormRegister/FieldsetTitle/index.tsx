import React from "react"

interface FieldsetTitleProps {
    title: string
}

const FieldsetTitle: React.FC<FieldsetTitleProps> = ({title}) => {
    return (
        <legend className="font-bold mb-2">{title}</legend>
    )
}

export default FieldsetTitle