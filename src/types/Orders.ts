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

export type StatusChoice =
	| "Получено"
	| "Заказ оплачен и ожидает обработки"
	| "Ожидает в пункте выдачи";
