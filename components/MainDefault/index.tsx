import React, { ReactNode } from "react";

interface MainDefaultProps {
    children: ReactNode;
    paddingForDownBar?: boolean;
}
const MainDefault: React.FC<MainDefaultProps> = ({children, paddingForDownBar}) => {

    const style = paddingForDownBar ? 'pb-[60px]' : ''


    return (
        <>
            <main className={`relative px-3 pb-2 ${style}`}>
                {children}
            </main>
        </>
    )
}

export default MainDefault