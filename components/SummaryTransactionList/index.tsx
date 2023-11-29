import Summarytransaction from "@/components/SummaryTransaction";
import ElementTitle from "@/components/ElementTitle";

interface SummaryTransactionListProps {
    transactions?: Transaction[];
    title?: string;
}


const SummaryTransactionList: React.FC<SummaryTransactionListProps> = ({ transactions, title }) => {

    return (
        <>
            { title && <ElementTitle title={title} />}
            <ul className="flex flex-col gap-2 my-4">
                {transactions?.map(transaction => (
                    <Summarytransaction 
                        key={transaction.id} 
                        transactionData={transaction} 
                    />
                ))}
            </ul>
        </>
    )
}

export default SummaryTransactionList;