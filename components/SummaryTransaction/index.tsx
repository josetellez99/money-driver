import React from "react"
import formatMoney from "@/utils/formatMoney"
import {getSpanishFormatFromDatabaseDate} from "@/utils/getDateSpanishFormat"
import styles from './SummaryTransaction.module.css'
import Image from 'next/image'

const translateTransactionType = (type: string): string => {
    const translations: { [key: string]: string } = {
        'income': 'Ingreso',
        'expense': 'Egreso',
        'movement': 'Movimiento',
    };

    return translations[type];
}

interface SummaryTransactionProps {
    transactionData: Transaction,
    showSkeletons?: boolean
}

const Summarytransaction: React.FC<SummaryTransactionProps> = ({transactionData, showSkeletons}) => {

    const typeAvailable = transactionData.type.length > 1
    const accountFromAvailable = transactionData.accountFrom.length > 1
    const accountToAvailable = transactionData.accountTo.length > 1
    const amountAvailable = transactionData.amount > 0

    let amountColor;

    amountColor = transactionData.type === 'income' ? 'text-green-400' : amountColor;
    amountColor = transactionData.type === 'expense' ? 'text-red-400' : amountColor;
    amountColor = transactionData.type === 'movement' ? 'text-green-400' : amountColor;

    
    return (
        <>
        {!showSkeletons && (
            <li className={`flex justify-between gap-1 h-[64px] rounded-lg bg-black`}>
                <figure className=" min-w-[20%] flex flex-col items-center justify-center h-[64px] bg-purple rounded-lg">
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
                <div className="w-[80%] py-2 px-2">
                    <div className="flex gap-2 justify-evenly">
                        <p className={`${styles.maxLong} text-center`}>{transactionData.accountFrom}</p>
                        <p className="text-greenYellow">-{'>'}</p>
                        <p className={`${styles.maxLong} text-center`}>{transactionData.accountTo}</p>
                    </div>
                    <div className="flex justify-between w-full px-1 items-center">
                        <p className={`text-sm font-thin`}>{getSpanishFormatFromDatabaseDate(transactionData.date.toLocaleString())}</p>
                        <p className={`text-lg font-bold ${amountColor} opacity-80"`}>{formatMoney(transactionData.amount)}</p>
                    </div>
                </div>
            </li>
        )}




        { showSkeletons && (
            <li className={`flex justify-between gap-1 h-[64px] rounded-lg bg-black`}>
            <figure className=" min-w-[20%] flex flex-col items-center justify-center h-[64px] bg-purple rounded-lg">

                { typeAvailable && (
                    <>
                        <div className="pt-1 pr-2 pl-2">
                            <Image 
                                src={`/${transactionData.type}-icon.png`}
                                width={36}
                                height={36}
                                alt="icon" 
                            />
                        </div>
                        <p className="text-[10px]">{translateTransactionType(transactionData.type)}</p>
                    </>
                )}
                { !typeAvailable && (
                    'Cargando...'
                )}
            </figure>
            <div className="w-[80%] py-2 px-2">
                <div className="flex gap-2 justify-evenly">
                        { accountFromAvailable && (
                            <p className={`${styles.maxLong}`}>{transactionData.accountFrom}</p>
                        )}
                        { !accountFromAvailable && (
                            'Cargando...'
                        )}
                    <p className="text-greenYellow">-{'>'}</p>
                        { accountToAvailable && (
                            <p className={`${styles.maxLong}`}>{transactionData.accountTo}</p>
                        )}
                        { !accountToAvailable && (
                            'Cargando...'
                        )}
                </div>
                <div className="flex justify-between w-full px-1 items-center">
                    <p className={`text-sm font-thin`}>{getSpanishFormatFromDatabaseDate(transactionData.date.toLocaleString())}</p>
                        { amountAvailable && (
                            <p className={`text-lg font-bold ${amountColor} opacity-80"`}>{formatMoney(transactionData.amount)}</p>
                        )}
                        { !amountAvailable && (
                            'Cargando...'
                        
                        )}
                </div>
            </div>
        </li>
        )}
            
        </>
    )
}

export default Summarytransaction