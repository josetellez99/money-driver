import React, { ReactNode } from "react";

interface SectionDefaultProps {
    children: ReactNode,
    className?: string,
}

const SectionDefault: React.FC<SectionDefaultProps> = ({children, className}) => {
    return (
        <>
            <section className={`${className}`}>
                {children}
            </section>
        </>
    )
}

export default SectionDefault