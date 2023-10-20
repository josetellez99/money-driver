
import { ReactNode } from "react";

interface RegisterOptionLinkViewProps {
    children: ReactNode
}

const ListOfRegisterLinksToPages: React.FC<RegisterOptionLinkViewProps> = ({ children }) => {

    return (
    <>
        <ul className="flex flex-col self-end mb-4 gap-2 items-center justify-center w-full">
            {children}
        </ul>
    </>
    );
};

export default ListOfRegisterLinksToPages