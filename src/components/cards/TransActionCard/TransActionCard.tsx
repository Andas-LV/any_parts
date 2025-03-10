import styles from "./transaction.module.css";
import { TTransAction } from "@/types/Payment";
import { Plus, Minus } from "lucide-react";
import { useCurrencySymbol } from "@/utils/useCurrency";

interface TransactionCardProps {
	transaction: TTransAction;
}

const TransactionCard = ({ transaction }: TransactionCardProps) => {
	return (
		<div className={styles.transactionCard}>
			<div className={styles.icon}>
				{transaction.actionType === "Пополнение" ? <Plus /> : <Minus />}
			</div>
			<div className={styles.details}>
				<h3>{transaction.name}</h3>
				<p>{transaction.actionType}</p>
			</div>
			<div className={styles.detailsAmount}>
				<div
					className={styles.amount}
					style={{
						color:
							transaction.actionType === "Пополнение" ? "#0C8F59" : "black",
					}}
				>
					{transaction.actionType === "Пополнение"
						? `+ ${transaction.amount}`
						: `- ${transaction.amount}`}
					{useCurrencySymbol(transaction.currency)}
				</div>
				<p>
					Кошелёк: {transaction.balancePoint}
					{useCurrencySymbol(transaction.currency)}
				</p>
			</div>
		</div>
	);
};

export default TransactionCard;
