import { z } from "zod";
import { editSchema, notificationEditSchema } from "@/schemas/account";
import { DeliveryPoint } from "@/types/DeliveryPoint";

export type User = {
	id: number;
	email: string;
	phone: string;
	apWallet: boolean;
	username: string;
	avatarUrl?: string | null;
	male: MaleChoice;
	currency: Currency;
	role: Roles;
	moderated?: boolean;
	deliveryPoints?: DeliveryPoint[];
};

export type TEditSchema = z.infer<typeof editSchema>;

export type TNotificationEditSchema = z.infer<typeof notificationEditSchema>;

export type MaleChoice = "Male" | "Female";

export type Roles = "user" | "dealer" | "admin";

export type Currency = "KZT" | "RUB";
