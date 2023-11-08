'use client'

import React from "react"
import {getDateSpanishFormatNumbers} from "@/utils/getDateSpanishFormat"
import { getDateSpanishFormat } from "@/utils/getDateSpanishFormat"
import formatMoney from "@/utils/formatMoney"

import PopUpLayer from "@/components/PopupLayer"

interface UserDebtProps {
    userDebtData: Debt,
    isActive: boolean,
    onClick?: React.MouseEventHandler<HTMLDivElement>,
}

const UserDebt: React.FC<UserDebtProps> = ({userDebtData, isActive, onClick}) => {

    const [openPopUp, setOpenPopUp] = React.useState<boolean>(false)

    const handleClickOpenPopUp = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        setOpenPopUp(true)
    }
    
    const handleClickClosePopUp = () => {
        setOpenPopUp(false)
    }


    const handleClickMainElement = (event: React.MouseEvent<HTMLDivElement>) => {
        onClick && onClick(event)
    }


    const calculatePaidPercentage = (totalAmount: number, paidAmount: number | undefined) => {

        if(paidAmount) {
            const paidPercentage = (paidAmount / totalAmount) * 100;
            return Math.round(paidPercentage)
        } else {
            return 0
        }
    }

    const paidPercentage = calculatePaidPercentage(userDebtData.totalAmount, userDebtData.paidAmount)

    const activeStyles = isActive ? 'bg-greenYellow text-black' : 'bg-darkBlue'

    return (
        <>
            <div onClick={handleClickMainElement} className={`${activeStyles} rounded-lg border-white border-2 p-1  cursor-pointer`}>
                <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-bold truncate overflow-ellipsis max-w-[200px]">{userDebtData.title}</span>
                    {<span className="text-sm font-thin">{getDateSpanishFormatNumbers(userDebtData.debtStartDay)}</span>}
                </div>
                <div className="flex flex-col items-end mb-1">
                    <div className="flex gap-1 mb-1">
                        <span className="text-purple font-bold text-sm">{formatMoney(userDebtData.paidAmount)}/</span>
                        <span className="font-bold text-sm">{formatMoney(userDebtData.totalAmount)}</span>
                    </div>
                    <div className="w-full h-2 rounded-lg bg-black">
                        <div style={{ width: `${paidPercentage}%`}} className={`h-2 rounded-lg bg-purple`}></div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button className="flex items-center gap-1" onClick={handleClickOpenPopUp}>
                        <span className="font-bold text-sm">Ver más</span>
                    </button>
                </div>
            </div>

            {
                openPopUp ? (
                    <>
                        <PopUpLayer>
                            <div className="flex flex-col w-full pt-[50%]">
                                <button className="text-lg font-bold mb-3" onClick={handleClickClosePopUp}>X</button>
                                <div className="rounded-lg border-white border-2 w-full p-1 bg-darkBlue cursor-pointer">
                                    <div className="flex flex-col mb-2">
                                        {<span className="font-thin mb-1">{getDateSpanishFormat(userDebtData.debtStartDay)}</span>}
                                        <span className="font-bold text-center">{userDebtData.title}</span>
                                    </div>
                                    <div className="flex flex-col items-end mb-2">
                                        <div className="flex gap-1 mb-1">
                                            <span className="text-purple font-bold text-sm">{formatMoney(userDebtData.paidAmount)}/</span>
                                            <span className="font-bold text-sm">{formatMoney(userDebtData.totalAmount)}</span>
                                        </div>
                                        <div className="w-full h-2 rounded-lg bg-black">
                                            <div style={{ width: `${paidPercentage}%`}} className={`h-2 rounded-lg bg-purple`}></div>
                                        </div>
                                    </div>
                                    <div className="mb-2">
                                        <p className="text-sm p-1 text-justify">{userDebtData.description}</p>
                                    </div>
                                        
                                </div>
                            </div>
                        </PopUpLayer>
                    </>
                ) : null
            }
        </>
    )
}

export default UserDebt