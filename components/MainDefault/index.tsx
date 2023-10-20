import React, { ReactNode } from "react";

interface MainDefaultProps {
    children: ReactNode;
}
const MainDefault: React.FC<MainDefaultProps> = ({children}) => {
    return (
        <>
            <main className="px-3 pb-2">
                {children}
            </main>
        </>
    )
}

export default MainDefault