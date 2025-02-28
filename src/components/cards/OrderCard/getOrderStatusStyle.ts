import {StatusChoice} from "@/types/Orders";
import { ButtonProps } from "@components/ui/button";
import styles from "./orderCard.module.css";

export const getOrderStatusStyle = (status: StatusChoice) => {
    switch (status) {
        case "Ожидает в пункте выдачи":
            return styles.statusPending;
        case "Заказ оплачен и ожидает обработки":
            return styles.statusProcessing;
        default:
            return styles.statusApproved;
    }
};

type ButtonVariant = NonNullable<ButtonProps["variant"]>;

export const getOrderAction = (status: StatusChoice, openFeedbackModal: () => void) => {
    const actions: Record<StatusChoice, { text: string; variant: ButtonVariant; onClick: () => void }> = {
        "Ожидает в пункте выдачи": {
            text: "Посмотреть товар",
            variant: "secondary",
            onClick: () => console.log("Заказ скоро можно забрать!"),
        },
        "Заказ оплачен и ожидает обработки": {
            text: "Посмотреть товар",
            variant: "secondary",
            onClick: () => console.log("Заказ отменён"),
        },
        "Получено": {
            text: "Написать отзыв",
            variant: "default",
            onClick: openFeedbackModal, // Открывает модалку
        },
    };

    return actions[status] || {
        text: "Подробнее",
        variant: "secondary",
        onClick: () => console.log("Проверяем статус заказа"),
    };
};
