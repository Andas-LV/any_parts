import styles from './group.module.css'
import {TTransAction} from "@/types/Payment";
import TransactionCard from "@components/transActions/TransActionCard/TransActionCard";

interface TransactionGroupProps {
    date: string;
    transactions: TTransAction[];
}

export const TransactionGroup = ({ date, transactions }: TransactionGroupProps) => {
    return (
        <div className={styles.transactionGroup}>
            <h2 className={styles.date}>{date}</h2>
            {transactions.map((transaction) => (
                <TransactionCard key={transaction.id} transaction={transaction} />
            ))}
        </div>
    );
};