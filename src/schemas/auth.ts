import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().email("Введите корректный email"),
	accepted_agreement: z
		.boolean()
		.refine((value) => value, "Вы должны согласиться с условиями"),
});

export const confirmEmail = z.object({
	email: z.string().email("Введите корректный email"),
	code: z.string().regex(/^\d{6}$/, "Код должен содержать 6 цифр"),
});

export const editSchema = z.object({
	username: z.string().min(1, "Имя пользователя обязательно "),
	phone: z.string().regex(/^\+7\d{10}$/, "Номер должен содержать 11 цифр"),
	male: z.enum(["Male", "Female"]).optional(),
});

export const notificationEditSchema = z.object({
	email: z.string().email("Введите корректный email"),
	phone: z.string().regex(/^\+7\d{10}$/, "Номер должен содержать 11 цифр"),
});
