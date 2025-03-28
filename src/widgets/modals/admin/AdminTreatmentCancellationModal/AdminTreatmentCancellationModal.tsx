import React from "react";
import styles from "./AdminTreatmentCancellationModal.module.css";
import ModalsLayout from "@/layouts/modalLayout/layout";
import { Button } from "@components/ui/button";
import { TMarketFullInfo } from "@/types/admin/Markets";
import { useToast } from "@/hooks/use-toast";

interface TreatmentCancellationModalProps {
	onClose: () => void;
	market: TMarketFullInfo;
}

export default function AdminTreatmentCancellationModal({
	onClose,
	market,
}: TreatmentCancellationModalProps) {
	const { toast } = useToast();

	const cancelTreatment = () => {
		try {
			// ЗАПРОС РАСТОРЖЕНИЯ

			onClose();
			toast({
				done: true,
				description: "Договор аннулирован.",
			});
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<ModalsLayout title={"Расторжение договора"} onClose={onClose}>
			<div className={styles.TreatmentCancellationModal}>
				<p>
					Расторгнуть договор с магазином {market.marketName}? Это действие
					нельзя отменить
				</p>

				<div className={styles.actionButtons}>
					<Button
						variant="secondary"
						className={styles.actionButton}
						onClick={onClose}
					>
						Отменить действие
					</Button>

					<Button
						onClick={cancelTreatment}
						variant={"destructive"}
						className={styles.actionButton}
					>
						Расторгнуть
					</Button>
				</div>
			</div>
		</ModalsLayout>
	);
}
