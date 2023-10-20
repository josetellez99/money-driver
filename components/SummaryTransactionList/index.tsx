import Summarytransaction from "@/components/SummaryTransaction"
import React from "react"

interface SummaryTransactionListProps {
    children: React.ReactNode
}

const SummaryTransactionList: React.FC<SummaryTransactionListProps> = ({children}) => {
    return (
        <>
            <ul className="flex flex-col gap-2">
                {children}
            </ul>
        </>
    )
}

export default SummaryTransactionList