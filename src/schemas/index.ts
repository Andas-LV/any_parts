import { z } from "zod";

export const loginSchema = z.object({
    phone: z.string().regex(/^\+7\d{10}$/, "Номер должен содержать 11 цифр"),
    agreed: z.boolean().refine(value => value, "Вы должны согласиться с условиями"),
});

export const confirmPhone = z.object({
    phone: z.string().regex(/^\+7\d{10}$/, "Номер должен содержать 11 цифр"),
    code: z.string().regex(/^\d{6}$/, "Код должен содержать 6 цифр")
});