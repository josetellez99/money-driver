import Summarytransaction from "@/components/SummaryTransaction";
import ElementTitle from "@/components/ElementTitle";
import {fetchUserTransactions} from "@/app/lib/action";

interface SummaryTransactionListServerSideProps {
    title: string;
    transactionsToFetch: {
        type?: string;
        limit: number;
    };
}


const SummaryTransactionListServerSide: React.FC<SummaryTransactionListServerSideProps> = async ({ title, transactionsToFetch }) => {

    const transactions = await fetchUserTransactions(transactionsToFetch.type || 'all', transactionsToFetch.limit)

    return (
        <>
            <ElementTitle title={title} />
            <ul className="flex flex-col gap-2 my-4">
                {transactions.map(transaction => (
                    <Summarytransaction 
                        key={transaction.id} 
                        transactionData={transaction} 
                    />
                ))}
            </ul>
        </>
    )
}

export default SummaryTransactionListServerSide;