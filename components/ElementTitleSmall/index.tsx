import React from 'react';

interface ElementTitleSmallProps {
    title: string
}

const ElementTitleSmall: React.FC<ElementTitleSmallProps> = ({title}) => {
    return(
        <>
            <h3 className='font-bold'>{title}</h3>
        </>
    )
}

export default ElementTitleSmall;