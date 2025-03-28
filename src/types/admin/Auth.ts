import { z } from "zod";
import { registerPartnerSchema } from "@/schemas/partners";

export type TAdminLogin = {
	email: string;
	password: string;
	rememberMe: boolean;
};

export type ConfirmCode = {
	email: string;
	code: string;
};

export type TNewPassword = {
	newPassword: string;
	newPasswordConfirm: string;
}