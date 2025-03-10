import styles from "./apModal.module.css";
import ModalsLayout from "@/layouts/modalLayout/layout";
import React, { useState } from "react";
import {
	AP_DISCOUNT_LIMIT,
	AP_DISCOUNT_PERCENTAGE,
	COMPANY_NAME,
} from "@/constants/apConstants";
import { useUserStore } from "@/entities/user/useUserStore";
import { useCurrencySymbol } from "@/utils/useCurrency";

export default function ApCreateModal({
	onClose,
	onNext,
}: {
	onClose: () => void;
	onNext: () => void;
}) {
	const { createApWallet, user } = useUserStore();

	const handleCreateApWallet = async () => {
		await createApWallet();
		onNext();
	};

	return (
		<ModalsLayout title="" onClose={onClose}>
			<div className={styles.modalContent}>
				<h2>
					Скидка{" "}
					<span className={styles.apPercentage}>
						${AP_DISCOUNT_PERCENTAGE}%
					</span>
					, если платить
					<br /> AP Кошельком
				</h2>

				<p>
					Для любых заказов до {AP_DISCOUNT_LIMIT}
					{user && useCurrencySymbol(user.currency)}
				</p>

				<button
					type="submit"
					className={styles.submitButton}
					onClick={handleCreateApWallet}
				>
					Создать бесплатно
				</button>

				<p className={styles.securityInfo}>
					Нажимая на кнопку, я соглашаюсь с условиями
					<span>
						Договора о комплексном обслуживании клиента ООО «{COMPANY_NAME}».
						Порядком обработки персональных данных ООО «{COMPANY_NAME}»,
					</span>
					с привязкой Электронного кошелька WB для последующих оплат по{" "}
					{COMPANY_NAME}в пользу ООО «{COMPANY_NAME}». Для вывода денег на
					банковский счет физического лица понадобится подтвердить Ваши данные в
					ООО «{COMPANY_NAME}» через Госуслуги.
				</p>
			</div>
		</ModalsLayout>
	);
}
