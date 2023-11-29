import React from 'react';
import LinksToPage from '@/components/LinksToPages';

interface ListOfLinksToPageProps {
    listButtonsData: ButtonData[];
}

const ListOfLinksToPage: React.FC<ListOfLinksToPageProps> = ({ listButtonsData }) => {

    return (
        <>
            <ul className="flex justify-between mb-10">
                {listButtonsData.map( item => (
                    <LinksToPage
                        key={item.id}
                        id={item.id!}
                        title={item.title} 
                        href={item.href!} 
                        iconURL={item.iconURL!} />
                ))}
            </ul>
        </>
    )
}

export default ListOfLinksToPage