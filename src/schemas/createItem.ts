import { z } from "zod";

export const CurrencyValidator = z.enum(["KZT", "RUB"]);

export const ManufactorersValidator = z.enum(["kazakh", "russia"]);

export const generalInfoSchema = z.object({
	productName: z
		.string({
			required_error: "Введите название товара",
		})
		.min(1, { message: "Название товара не может быть пустым" }),

	category: z
		.string({
			required_error: "Выберите категорию товара",
		})
		.min(1, { message: "Категория товара не может быть пустой" }),

	type: z
		.string({
			required_error: "Укажите тип товара",
		})
		.min(1, { message: "Тип товара не может быть пустым" }),

	article: z
		.string({
			required_error: "Введите артикул товара",
		})
		.min(1, { message: "Артикул товара не может быть пустым" }),

	currency: CurrencyValidator,

	brand: z
		.string({
			required_error: "Введите название бренда",
		})
		.min(1, { message: "Название бренда не может быть пустым" }),

	images: z
		.array(
			z.string({
				required_error: "Изображение должно быть строкой",
			}),
		)
		.min(1, { message: "Добавьте хотя бы одно изображение" }),
});

export const characteristicsSchema = z.object({
	description: z
		.string({
			required_error: "Введите описание",
			invalid_type_error: "Описание должно быть строкой",
		})
		.min(1, { message: "Описание не может быть пустым" })
		.max(2000, { message: "Описание не может быть больше 2000 символов" }),

	packageLength: z
		.number({
			invalid_type_error: "Длина упаковки должна быть числом",
		})
		.optional(),

	packageWidth: z
		.number({
			invalid_type_error: "Ширина упаковки должна быть числом",
		})
		.optional(),

	packageHeight: z
		.number({
			invalid_type_error: "Высота упаковки должна быть числом",
		})
		.optional(),

	weight: z.number({
		required_error: "Укажите вес",
		invalid_type_error: "Вес должен быть числом",
	}),

	material: z
		.string({
			required_error: "Укажите материал",
			invalid_type_error: "Материал должен быть строкой",
		})
		.min(1, { message: "Материал не может быть пустым" }),

	manuFactored: ManufactorersValidator.refine((val) => !!val, {
		message: "Укажите производителя",
	}),

	features: z
		.string({
			invalid_type_error: "Особенность должна быть строкой",
		})
		.min(1, { message: "Добавьте хотя бы одну особенность" }),
});

export const configurationSchema = z.object({
	colors: z
		.array(
			z.object({
				colorName: z
					.string()
					.min(1, { message: "Название цвета не может быть пустым" }),
				// Если нужно загружать файл (File) — z.any().optional().
				// Если хранится URL — z.string().url().optional().
				photo: z.any().optional(),
			}),
		)
		.min(1, { message: "Добавьте хотя бы один цвет" }),

	sizes: z
		.array(
			z.object({
				sizeName: z
					.string()
					.min(1, { message: "Название размера не может быть пустым" }),
			}),
		)
		.min(1, { message: "Добавьте хотя бы один размер" }),
});

export const priceMakingSchema = z.object({
	prices: z
		.array(
			z.object({
				colorName: z
					.string()
					.min(1, { message: "Название цвета не может быть пустым" }),
				photo: z.any().optional(),
				sizes: z
					.array(
						z.object({
							sizeName: z
								.string()
								.min(1, { message: "Название размера не может быть пустым" }),
							price: z.number({
								invalid_type_error: "Цена должна быть числом",
							}),
							discountPrice: z
								.number({
									invalid_type_error: "Цена(со скидкой) должна быть числом",
								})
								.optional(),
							barcode: z.string({
								invalid_type_error: "Код должен быть числом",
							}),
						}),
					)
					.min(1, { message: "Добавьте хотя бы один размер" }),
			}),
		)
		.min(1, { message: "Добавьте хотя бы один цвет" }),
});
