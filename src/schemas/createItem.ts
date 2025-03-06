import { z } from "zod";

export const CurrencyValidator = z.enum(["KZT", "RUB"]);

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

  brandName: z
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
    .string({ required_error: "Введите описание" })
    .min(1, { message: "Описание не может быть пустым" }),

  packageLength: z.number({ required_error: "Укажите длину упаковки" }),

  packageWidth: z.number({ required_error: "Укажите ширину упаковки" }),

  packageHeight: z.number({ required_error: "Укажите высоту упаковки" }),

  weight: z.number({ required_error: "Укажите вес" }),

  material: z
    .string({ required_error: "Укажите материал" })
    .min(1, { message: "Материал не может быть пустым" }),

  features: z
    .array(z.string())
    .min(1, { message: "Добавьте хотя бы одну особенность" }),
});
