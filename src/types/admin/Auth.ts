import { z } from "zod";
import { changePasswordSchema } from "@/schemas/account";

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

export type TChangePassword = z.infer<typeof changePasswordSchema>;