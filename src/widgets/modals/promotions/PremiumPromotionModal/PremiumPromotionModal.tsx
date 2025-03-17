import React from "react";
import styles from "./PremiumPromotionModal.module.css";
import { Button } from "@components/ui/button";
import ModalsLayout from "@/layouts/modalLayout/layout";
import { useToast } from "@/hooks/use-toast";

interface PremiumPromotionModalProps {
	onClose: () => void;
}

export default function PremiumPromotionModal({
	onClose,
}: PremiumPromotionModalProps) {
	const { toast } = useToast();

	const promote = () => {
		onClose();
		toast({
			failed: true,
			description: "Недостаточно средств в кошельке",
		});
	};

	return (
		<ModalsLayout title={"Тариф «Премиум-продвижение»"} onClose={onClose}>
			<div className={styles.PremiumPromotionModal}>
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
