import {z} from "zod";

export const cardSchema = z.object({
    cardId: z.string().length(12, "Номер карты должен содержать 12 цифр"),
    expires: z.string().regex(/^\d{2}\/\d{2}$/, "Формат: MM/ГГ"),
    cvc: z.string().length(3, "CVC должен содержать 3 цифры"),
});
