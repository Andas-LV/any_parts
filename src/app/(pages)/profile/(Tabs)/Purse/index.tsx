"use client";

import styles from "./page.module.css";
import Menu from "./menu";
import { usePaymentStore } from "@/entities/payment/usePaymentStore";
import { groupTransactionsByDate } from "@components/transActions/groupTransactionsByDate";
import { TransactionGroup } from "@components/transActions/TransActionsGroup/TransActionsGroup";
import Loading from "@components/Loading";

export default function Purse() {
	const { transActions } = usePaymentStore();

	const transActionsExists =
		Array.isArray(transActions) && transActions.length > 0;
	const groupedTransactions = transActionsExists
		? groupTransactionsByDate(transActions)
		: {};

	return (
		<div className={styles.purseWrapper}>
			<div className={styles.menuBar}>
				<h1>Баланс</h1>
				<Menu />
			</div>

			{transActionsExists ? (
				<div className={styles.transActions}>
					{Object.entries(groupedTransactions).map(([date, trans]) => (
						<TransactionGroup key={date} date={date} transactions={trans} />
					))}
				</div>
			) : (
				<div className={styles.noTransActions}>
					<h3>Операций пока нет</h3>
					<p>После совершения первой операции, покажем ее здесь</p>
				</div>
			)}
		</div>
	);
}
