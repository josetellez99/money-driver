import React, { ReactNode } from "react";
import formatMoney from "@/utils/formatMoney";
import {calculateTotalAmountThisMonth, calculateTotalAmountInAccounts} from '@/app/lib/action'

const getDataForSummaryTable = async () => {

    const totalIncomesThisMonth = await calculateTotalAmountThisMonth('income')
    const totalExpensesThisMonth = await calculateTotalAmountThisMonth('expense')
    const totalAmountInAccounts = await calculateTotalAmountInAccounts()

    return {totalIncomesThisMonth, totalExpensesThisMonth, totalAmountInAccounts}
}

const SummaryTable = async () => {

    const {totalIncomesThisMonth, totalExpensesThisMonth, totalAmountInAccounts} = await getDataForSummaryTable()

    const tableData = [
        {title: 'Disponible', value: totalAmountInAccounts, id: 1},
        {title: 'Balance', value: 10000, id: 2},
        {title: 'Ingresos', value: totalIncomesThisMonth, id: 3},
        {title: 'Egresos', value: totalExpensesThisMonth, id: 4},
    ]

    return (
    <table className="w-full mb-10">
        <tbody className="block bg-purple rounded-lg">
            <tr className="grid grid-cols-2 grid-rows-2 py-3 gap-3">
                {tableData.map( item => (
                    <td className="">
                        <p className="h-full flex flex-col items-center justify-center">
                            <span className="text-sm text-black">{item.title}</span>
                            <span className="text-xl font-bold">{formatMoney(item.value!)}</span>
                        </p>
                    </td>
                ))}
            </tr>
        </tbody>
    </table>
    );
};

export default SummaryTable;