import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Введите корректный email"),
    agreed: z.boolean().refine(value => value, "Вы должны согласиться с условиями"),
});

export const confirmEmail = z.object({
    email: z.string().email("Введите корректный email"),
    code: z.string().regex(/^\d{6}$/, "Код должен содержать 6 цифр")
});