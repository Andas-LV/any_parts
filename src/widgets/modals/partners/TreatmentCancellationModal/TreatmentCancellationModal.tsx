import React from "react";
import styles from "./TreatmentCancellationModal.module.css";
import ModalsLayout from "@/layouts/modalLayout/layout";
import { Button } from "@components/ui/button";
import { useRouter } from "next/navigation";
import { routes } from "@/configs/routes";

interface TreatmentCancellationModalProps {
	onClose: () => void;
}

export default function TreatmentCancellationModal ({onClose}: TreatmentCancellationModalProps) {
	const router = useRouter();

	const cancelTreatment = () => {
    try{
			// ЗАПРОС РАСТОРЖЕНИЯ
			onClose();
			router.push(routes.partnersAuth())
		} catch(error){
			console.error(error)
		}
	}

	return (
		<ModalsLayout title={"Расторжение договора"} onClose={onClose}>
			<div className={styles.TreatmentCancellationModal}>
				<p>
					После расторжения договора ваш магазин будет отключён, а объявления удалены. Этот процесс необратим. Вы уверены?
				</p>

				<div className={styles.actionButtons}>
					<Button
						variant="secondary"
						className={styles.actionButton}
						onClick={onClose}
					>
						Отменить действие
					</Button>

					<Button onClick={cancelTreatment} variant={"destructive"} className={styles.actionButton}>
						Расторгнуть
					</Button>
				</div>
			</div>
		</ModalsLayout>
	);
}
