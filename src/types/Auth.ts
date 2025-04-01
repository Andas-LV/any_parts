import { z } from "zod";
import { registerPartnerSchema } from "@/schemas/partners";

export type Login = {
	email: string;
	accepted_agreement: boolean;
};

export type ConfirmCode = {
	email: string;
	code: string;
};

export type Register = {
	email: string;
	username: string;
};

export type PartnerRegister = z.infer<typeof registerPartnerSchema>;

export type PartnerCountryValidator = "kazakh" | "russia";

export type organizationValueType = "ИП" | "ТОО" | "АО";

export const organizationTypes: {
	value: organizationValueType;
	label: string;
}[] = [
	{ value: "ИП", label: "ИП" },
	{ value: "ТОО", label: "ТОО" },
	{ value: "АО", label: "АО" },
];
