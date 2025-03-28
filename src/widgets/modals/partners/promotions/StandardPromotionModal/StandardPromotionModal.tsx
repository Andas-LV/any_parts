import React from "react";
import styles from "./StandardPromotionModal.module.css";
import { Button } from "@components/ui/button";
import ModalsLayout from "@/layouts/modalLayout/layout";
import { useToast } from "@/hooks/use-toast";

interface StandardPromotionModalProps {
	onClose: () => void;
}

export default function StandardPromotionModal({
	onClose,
}: StandardPromotionModalProps) {
	const { toast } = useToast();

	const promote = () => {
		onClose();
		toast({
			done: true,
			description: "Продвижение активировано!",
		});
	};

	return (
		<ModalsLayout title={"Тариф «Стандарт-продвижение»"} onClose={onClose}>
			<div className={styles.StandardPromotionModal}>
				<p>
					Тариф повысит позиции вашего товара в поиске и привлечёт больше на 30
					дней. Активировать?
				</p>

				<div className={styles.actionButtons}>
					<Button
						variant="ghost"
						className={styles.cancelBtn}
						onClick={onClose}
					>
						Отменить
					</Button>

					<Button className={styles.submitButton} onClick={promote}>
						Активировать
					</Button>
				</div>
			</div>
		</ModalsLayout>
	);
}
