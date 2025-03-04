import { z } from "zod";

const CountryValidator = z.preprocess(
  (val) => (typeof val === "string" && val.trim() === "" ? undefined : val),
  z.enum(["kazakh", "russia"], {
    errorMap: () => ({ message: "Страна регистрации обязательна" }),
  }),
);

export const OrganizationType = z.preprocess(
  (val) => (typeof val === "string" && val.trim() === "" ? undefined : val),
  z.enum(["единичное", "серийное", "массовое"], {
    errorMap: () => ({ message: "Тип организации обязателен" }),
  }),
);

export const registerPartnerSchema = z.object({
  marketName: z
    .string()
    .min(2, "Название магазина должно содержать минимум 2 символа"),
  country: CountryValidator,
  organizationType: OrganizationType,
  contactNumber: z
    .string()
    .min(11, "Контактный номер должен содержать минимум 11 символов"),
});

export const registerCompanySchema = z.object({
  marketName: z
    .string()
    .min(2, "Название магазина должно содержать минимум 2 символа"),
  country: CountryValidator,
  organizationType: OrganizationType,
});
