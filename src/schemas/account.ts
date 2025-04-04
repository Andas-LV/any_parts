import { z } from "zod";

export const editSchema = z.object({
	username: z.string().min(1, "Имя пользователя обязательно "),
	phone: z.string().regex(/^\+7\d{10}$/, "Номер должен содержать 11 цифр"),
	male: z.enum(["Male", "Female"]).optional(),
});

export const notificationEditSchema = z.object({
	email: z.string().email("Введите корректный email"),
	phone: z.string().regex(/^\+7\d{10}$/, "Номер должен содержать 11 цифр"),
});

export const adminEmailSchema = z.object({
	email: z.string().email("Введите корректный email"),
});

export const changePasswordSchema = z.object({
	oldPassword: z.string().min(1, "Введите старый пароль"),
	newPassword: z.string().min(8, "Минимум 8 символов"),
	confirmPassword: z.string().min(8, "Минимум 8 символов"),
});