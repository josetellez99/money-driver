import React from 'react';

interface BorderDivProps {
    children: React.ReactNode;
    className?: string;
}

const BorderDiv: React.FC<BorderDivProps> = ({ children, className }) => {
    return (
        <div className={`border border-white rounded-md py-1 px-2 ${className}`}>
            {children}
        </div>
    );
}

export default BorderDiv;