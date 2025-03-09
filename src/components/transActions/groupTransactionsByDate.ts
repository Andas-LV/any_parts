import { TTransAction } from "@/types/Payment";

export const groupTransactionsByDate = (transactions: TTransAction[]) => {
	return transactions.reduce(
		(acc, transaction) => {
			const dateObj = new Date(transaction.date);
			const dateKey = dateObj.toLocaleDateString("ru-RU", {
				day: "numeric",
				month: "long",
			});
			const dayOfWeek = dateObj.toLocaleDateString("ru-RU", {
				weekday: "long",
			});
			const formattedDate = `${dateKey}, ${dayOfWeek}`;

			if (!acc[formattedDate]) {
				acc[formattedDate] = [];
			}

			acc[formattedDate].push(transaction);
			return acc;
		},
		{} as Record<string, TTransAction[]>,
	);
};
