import { StatusChoice } from "@/types/Orders";
import { ButtonProps } from "@components/ui/button";
import styles from "./orderCard.module.css";

export const getOrderStatusStyle = (status: StatusChoice) => {
	switch (status) {
		case StatusChoice.waiting:
			return styles.statusWaiting;
		case StatusChoice.pending:
			return styles.statusPending;
		case StatusChoice.received:
		default:
			return styles.statusReceived;
	}
};

type ButtonVariant = NonNullable<ButtonProps["variant"]>;

export const getOrderAction = (
	status: StatusChoice,
	openFeedbackModal: () => void,
) => {
	const actions: Record<
		StatusChoice,
		{ text: string; variant: ButtonVariant; onClick: () => void }
	> = {
		[StatusChoice.waiting]: {
			text: "Посмотреть товар",
			variant: "secondary",
			onClick: () => console.log("Заказ скоро можно забрать!"),
		},
		[StatusChoice.pending]: {
			text: "Посмотреть товар",
			variant: "secondary",
			onClick: () => console.log("Заказ отменён"),
		},
		[StatusChoice.received]: {
			text: "Написать отзыв",
			variant: "default",
			onClick: openFeedbackModal,
		},
	};

	return (
		actions[status] || {
			text: "Подробнее",
			variant: "secondary",
			onClick: () => console.log("Проверяем статус заказа"),
		}
	);
};
