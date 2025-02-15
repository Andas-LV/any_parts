import {PhotoOptions} from "@/types/Refund";

export const itemSorts = [
    {
        name: 'По дате добавления',
        value: "byDate",
    },
    {
        name: 'По популярности',
        value: "byPopular",
    },
]

export const REFUND_START_PENDING = 7;

export const RETURN_REASONS = [
    "Товар с браком",
    "Не оригинал",
    "Есть повреждения",
    "Товаром пользовались",
    "Другое"
];

export const PHOTO_OPTIONS: PhotoOptions[] = [
    "Товар целиком", "Бирка или этикетка",
    "Штрихкод на упаковке", "Дефект товара",
    "Срок годности или № партии", "Видео дефекта"
];