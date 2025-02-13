import styles from "./apModal.module.css";
import ModalsLayout from "@components/modals/layout";
import React, { useState } from "react";
import { AP_DISCOUNT_LIMIT, AP_DISCOUNT_PERCENTAGE, COMPANY_NAME } from "@/utils/const";
import AfterCreate from "@components/modals/apWallet/afterCreateWallet/afterCreate";
import {useUserStore} from "@/store/useUserStore";

export default function ApCreateModal({ onClose }: { onClose: () => void }) {
    const {createApWallet} = useUserStore()

    const [showAfterCreate, setShowAfterCreate] = useState(false);

    const handleCreateApWallet = async() => {
        await createApWallet()
        setShowAfterCreate(true);
    }

    if (showAfterCreate) {
        return <AfterCreate onClose={onClose} />;
    }

    return (
        <ModalsLayout title="" back={false} onClose={onClose}>
            <div className={styles.modalContent}>
                <h2>
                    Скидка <span className={styles.apPercentage}>${AP_DISCOUNT_PERCENTAGE}%</span>, если платить
                    <br /> AP Кошельком
                </h2>

                <p>Для любых заказов до {AP_DISCOUNT_LIMIT} ₽/₸</p>

                <button type="submit" className={styles.submitButton} onClick={handleCreateApWallet}>
                    Создать бесплатно
                </button>

                <p className={styles.securityInfo}>
                    Нажимая на кнопку, я соглашаюсь с условиями
                    <span>
                        Договора о комплексном обслуживании
                        клиента ООО «{COMPANY_NAME}».
                        Порядком обработки персональных данных ООО «{COMPANY_NAME}»,
                    </span>
                    с привязкой Электронного кошелька WB для последующих оплат по {COMPANY_NAME}
                    в пользу ООО «{COMPANY_NAME}». Для вывода денег на банковский счет физического лица
                    понадобится подтвердить Ваши данные в ООО «{COMPANY_NAME}» через Госуслуги.
                </p>
            </div>
        </ModalsLayout>
    );
}
