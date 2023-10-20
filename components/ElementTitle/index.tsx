import React from 'react';

interface ElementTitleProps {
    title: string;
}

const ElementTitle: React.FC<ElementTitleProps> = ({title}) => {
    return (
        <>
            <h2 className='text-xl font-bold mb-3'>{title}</h2>
        </>
    )
}

export default ElementTitle;