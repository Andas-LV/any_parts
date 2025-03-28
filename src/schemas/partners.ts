import { z } from "zod";
import { CurrencyValidator } from "@/schemas/createItem";

const CountryValidator = z.preprocess(
	(val) => (typeof val === "string" && val.trim() === "" ? undefined : val),
	z.enum(["kazakh", "russia"], {
		errorMap: () => ({ message: "Страна регистрации обязательна" }),
	}),
);

export const OrganizationType = z.preprocess(
	(val) => (typeof val === "string" && val.trim() === "" ? undefined : val),
	z.enum(["ИП", "ТОО", "АО"], {
		errorMap: () => ({ message: "Тип организации обязателен" }),
	}),
);

export const sizeLimit = 32 * 1024 * 1024;
export const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

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

// FULL SIGN UP
export const checkDataSchema = z.object({
	organizationName: z
		.string()
		.min(2, "Название организации должно содержать минимум 2 символа"),
	taxNumber: z.string().regex(/^\d{12}$/, "ИНН должен состоять 12 цифр"),
	organizationType: OrganizationType,
});

export const addressRegisterSchema = z.object({
	country: CountryValidator,
	city: z.string().min(1, "Город обязателен для заполнения"),
	address: z.string().min(1, "Адрес обязателен для заполнения"),
});

export const documentSchema = z.object({
	document: z.preprocess(
		(file) => {
			if (file instanceof FileList) {
				return file.item(0);
			}
			return file;
		},
		z
			.any()
			.refine((val) => val instanceof File, {
				message: "Пожалуйста, выберите файл",
			})
			.refine((file) => {
				return (
					file && allowedTypes.includes(file.type) && file.size <= sizeLimit
				);
			}, "Файл должен быть формата jpg, png или pdf, и не превышать 32 МБ."),
	),
});

export const requisitesSchema = z.object({
	account: z
		.string()
		.min(10, "Номер счета должен содержать минимум 10 символов"),
	currency: CurrencyValidator,
	swift: z
		.string()
		.regex(
			/^[A-Z0-9]{8}(?:[A-Z0-9]{3})?$/,
			"SWIFT код должен содержать 8 или 11 символов, заглавные буквы и цифры",
		),
	bankName: z.string().min(1, "Название банка обязательно"),
	bankCity: z.string().min(1, "Город банка обязателен"),
	bankAddress: z.string().min(1, "Адрес банка обязателен"),
});
