import { Payment } from "@/types/Payment";

export type TOrder = {
	id: number;
	name: string;
	image: string;
	orderId: number;
	shopName: string;
	productName: string;
	address: string;
	price: number;
	status: StatusChoice;
	eCheck: string;
	card: Payment;
};

// export type StatusChoice =
// 	| "Получено"
// 	| "Заказ оплачен и ожидает обработки"
// 	| "Ожидает в пункте выдачи";

export type TItemDeliveryStatuses = {
	name: StatusChoice;
	value: keyof StatusChoice;
	backgroundColor: string;
};

export enum StatusChoice {
	received = "Получено",
	pending = "Заказ оплачен и ожидает обработки",
	waiting = "Ожидает в пункте выдачи",
}
