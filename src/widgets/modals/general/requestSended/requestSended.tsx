import { Icons } from "@/assets/svg/svg";
import styles from "./requestSended.module.css";
import ModalsLayout from "@/layouts/modalLayout/layout";
import React from "react";
import { REFUND_START_PENDING } from "@/constants/item";
import { Button } from "@components/ui/button";

export default function RequestSended({ onClose }: { onClose: () => void }) {
	return (
		<ModalsLayout title="" onClose={onClose}>
			<div className={styles.modalContent}>
				<Icons.Done width={80} height={80} />

				<h2>Заявка отправлена!</h2>

				<p>
					Ваша заявка принята в обработку и будет рассмотрена
					<span className={styles.refundDate}>
						в течение {REFUND_START_PENDING} рабочих дней
					</span>
				</p>

				<Button className={styles.submitButton} onClick={onClose}>
					Закрыть
				</Button>
			</div>
		</ModalsLayout>
	);
}
