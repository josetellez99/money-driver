import React from "react"
import formatMoney from "@/utils/formatMoney"
import {getSpanishFormatFromDatabaseDate} from "@/utils/getDateSpanishFormat"
import styles from './SummaryTransaction.module.css'
import Image from 'next/image'

interface SummaryTransactionProps {
    transactionData: Transaction
}

const Summarytransaction: React.FC<SummaryTransactionProps> = ({transactionData}) => {
    const translateTransactionType = (type: string): string => {
        const translations: { [key: string]: string } = {
            'income': 'Ingreso',
            'expense': 'Egreso',
            'movement': 'Movimiento',
        };

        return translations[type];
    }

    return (
        <>
            <li className="flex justify-between gap-2 h-[60px] py-1 px-2 rounded-lg bg-black">
                <figure className="flex flex-col items-center justify-center h-[52px] w-[70px] bg-purple rounded-lg">
                    <div className="pt-1 pr-2 pl-2">
                        <Image 
                            src={`/${transactionData.type}-icon.png`}
                            width={36}
                            height={36}
                            alt="icon" 
                        />
                    </div>
                    <p className="text-[10px]">{translateTransactionType(transactionData.type)}</p>
                </figure>
                <div className="w-[85%]">
                    <div className="flex gap-3 justify-center">
                        <p className={`${styles.maxLong}`}>{transactionData.accountFrom}</p>
                        <p className="text-greenYellow">-{'>'}</p>
                        <p className={`${styles.maxLong}`}>{transactionData.accountTo}</p>
                    </div>
                    <div className="flex gap-4 justify-center items-center">
                        <p className={`${styles.maxLongDate} text-sm font-thin`}>{getSpanishFormatFromDatabaseDate(transactionData.date.toLocaleString())}</p>
                        <p className="text-lg font-bold text-red-400">{formatMoney(transactionData.amount)}</p>
                    </div>
                </div>
            </li>
        </>
    )
}

export default Summarytransaction