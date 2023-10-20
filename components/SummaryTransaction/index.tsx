import React from "react"
import formatMoney from "@/utils/formatMoney"

import styles from './SummaryTransaction.module.css'

interface SummaryTransactionProps {
    transactionData: Transaction
}

const Summarytransaction: React.FC<SummaryTransactionProps> = ({transactionData}) => {
    return (
        <>
            <li className="flex justify-between gap-2 h-[60px] py-1 px-2 rounded-lg bg-black">
                <figure className="flex justify-center h-[52px] w-[52px] bg-purple rounded-lg">
                    <img src="" alt="" />
                    <p className="self-end text-[10px]">{transactionData.type}</p>
                </figure>
                <div className="w-[85%]">
                    <div className="flex gap-3 justify-center">
                        <p className={`${styles.maxLong}`}>{transactionData.accountFrom}</p>
                        {/* <img src="" alt="" /> */}
                        <p className="text-greenYellow">-{'>'}</p>
                        <p className={`${styles.maxLong}`}>{transactionData.accountTo}</p>
                    </div>
                    <div className="flex gap-4 justify-center items-center">
                        <p className="text-sm font-thin">{transactionData.date}</p>
                        <p className="text-lg font-bold text-red-400">{formatMoney(transactionData.amount)}</p>
                    </div>
                </div>
            </li>
        </>
    )
}

export default Summarytransaction