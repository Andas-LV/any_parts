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