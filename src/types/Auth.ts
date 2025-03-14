import { z } from "zod";
import { registerPartnerSchema } from "@/schemas/partners";

export type Login = {
	email: string;
	agreed: boolean;
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

export type organizationValueType = "единичное" | "серийное" | "массовое";

export const organizationTypes: {
	value: organizationValueType;
	label: string;
}[] = [
	{ value: "единичное", label: "Единичное" },
	{ value: "серийное", label: "Серийное" },
	{ value: "массовое", label: "Массовое" },
];
