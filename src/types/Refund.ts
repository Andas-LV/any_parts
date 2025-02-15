export type RefundItem = {
    id: number;
    price: number;

    status: StatusTypes;
    comment?: string;
    images: Media[];

    createdAt: Date;
}

export type RefundItemValidator = {
    shopName: string;
    productName: string;

    refundCause: RefundCauseTypes;
    price: number;

    detailedContext: string;
    images: Media[];

    createdAt: Date;
}

export interface Media {
    id?: number
    file: string
    file_type: string
    file_name?: string
}

export type RefundCauseTypes =
    'Товар с браком' |
    'Не оригинал' |
    'Есть повреждения' |
    'Товаром пользовались'|
    'Другое'

export type PhotoOptions =
    "Товар целиком" | "Бирка или этикетка"|
    "Штрихкод на упаковке" | "Дефект товара" |
    "Срок годности или № партии" | "Видео дефекта"

export type StatusTypes = 'На рассмотрении' | 'Одобрено' | 'Не одобрено';