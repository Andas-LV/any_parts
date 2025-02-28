import { Payment, TTransAction } from "@/types/Payment";

export const examplePayments: Payment[] = [
  {
    id: 1,
    cardId: 456789123258,
    isActive: true,
    type: "Visa",
  },
];

export const exampleTransActions: TTransAction[] = [
  {
    id: 432,
    name: "Пополнение по счёту {name}",
    amount: 10000,
    currency: "RUB",
    actionType: "Пополнение",
    date: new Date("2025-02-14T12:30:00Z"),
    balancePoint: 130000,
  },
  {
    id: 261,
    name: "Перечисление по счёту {name}",
    amount: 5000,
    currency: "KZT",
    actionType: "Списание",
    date: new Date("2025-02-14T12:30:00Z"),
    balancePoint: 120000,
  },
  {
    id: 887,
    name: "Пополнение по счёту {name}",
    amount: 15000,
    currency: "RUB",
    actionType: "Пополнение",
    date: new Date("2025-02-07T12:30:00Z"),
    balancePoint: 90000,
  },
  {
    id: 34,
    name: "Возврат",
    amount: 50000,
    currency: "KZT",
    actionType: "Пополнение",
    date: new Date("2025-02-10T12:30:00Z"),
    balancePoint: 40000,
  },
];
