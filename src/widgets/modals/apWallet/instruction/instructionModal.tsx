import styles from "./instructionModal.module.css";
import ModalsLayout from "@/layouts/modalLayout/layout";
import React from "react";
import { useUserStore } from "@/entities/user/useUserStore";
import { COMPANY_NAME } from "@/constants/apConstants";

export default function InstructionModal({ onClose }: { onClose: () => void }) {
	const { user } = useUserStore();

	return (
		<ModalsLayout title="Как пополнить кошелёк" onClose={onClose}>
			<div className={styles.modalContent}>
				<div className={styles.steps}>
					<div className={styles.step}>
						<div className={styles.stepNumber}>1</div>
						<p>
							В приложении банка, к которому привязан номер
							<span>{user?.phone}</span>, выберите перевод по телефону или СБП
						</p>
					</div>
					<div className={styles.step}>
						<div className={styles.stepNumber}>2</div>
						<p>
							Укажите тот же телефон, сумму получателя «
							<span>{COMPANY_NAME}</span>»
						</p>
					</div>
					<div className={styles.step}>
						<div className={styles.stepNumber}>3</div>
						<p>Готово! деньги в кошельке</p>
					</div>
				</div>

				<button type="submit" className={styles.submitButton} onClick={onClose}>
					Понятно, спасибо
				</button>
			</div>
		</ModalsLayout>
	);
}
