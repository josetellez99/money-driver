import React, { ReactNode } from "react";
import formatMoney from "@/utils/formatMoney";

type TitleValueData = {
    title: string;
    value: number;
};


const infoData = [
    {title: 'Disponible', value: 180000, id: 1},
    {title: 'Balance', value: 87000, id: 2},
    {title: 'Ingresos', value: 2587000, id: 3},
    {title: 'Egresos', value: 2000700, id: 4},
]

interface SummaryTableProps {
    children: ReactNode
} 

const SummaryTableRow: React.FC<SummaryTableProps> = ({children}) => {
    return (
        <>
            <tr className="grid grid-cols-2 grid-rows-2 py-3 gap-3">
                {children}
            </tr>
        </>
    )
}

interface SummaryTableDataProps {
    data: TitleValueData
}

const SummaryTableData: React.FC<SummaryTableDataProps> = ({data}) => {
    return (
        <td className="">
            <p className="h-full flex flex-col items-center justify-center">
                <span className="text-sm text-black">{data.title}</span>
                <span className="text-xl font-bold">{formatMoney(data.value)}</span>
            </p>
        </td>
    )
}

const SummaryTable = () => {
    return (
    <table className="w-full mb-10">
        <tbody className="block bg-purple rounded-lg">
            <SummaryTableRow>
                {infoData.map( item => (
                    <SummaryTableData  
                        data={item} 
                        key={item.id}
                    />
                ))}
            </SummaryTableRow>
        </tbody>
    </table>
    );
};

export default SummaryTable;