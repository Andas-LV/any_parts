export type Payment = {
    id: number;
    cardId: number;
    isActive: boolean;
    type: 'Visa' | 'MasterCard'
}

export type PaymentCardValidator = {
    cardId: number;
    expires: string;
    cvc: number;
}

export type TTransAction = {
    id: number;
    name: string;
    amount: number;
    currency: TCurrencyTypes;
    actionType: actionTypes,
    date: Date;
    balancePoint: number;
}

export type TCurrencyTypes = "Тенге" | "Рубль"
export type actionTypes = 'Пополнение' | 'Списание'