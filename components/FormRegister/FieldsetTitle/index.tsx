import React from "react"
import { FaArrowRight } from "react-icons/fa";

interface FieldsetTitleProps {
    title: string
}

const FieldsetTitle: React.FC<FieldsetTitleProps> = ({title}) => {
    return (
        <div className="flex items-center mb-4">
            <FaArrowRight className="text-greenYellow mr-2" />
            <legend className="font-bold">{title}</legend>
        </div>
    )
}

export default FieldsetTitle