import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().email("Неверный формат email"),
	accepted_agreement: z
		.boolean()
		.refine((value) => value, "Вы должны согласиться с условиями"),
	code: z.string().optional(),
	username: z.string().optional(),
});

export const confirmEmail = z.object({
	email: z.string().email("Введите корректный email"),
	code: z.string().regex(/^\d{6}$/, "Код должен содержать 6 цифр"),
});
