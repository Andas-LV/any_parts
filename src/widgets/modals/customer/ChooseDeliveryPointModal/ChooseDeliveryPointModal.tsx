import React, { useState } from "react";
import styles from "./ChooseDeliveryPointModal.module.css";
import ModalsLayout from "@/layouts/modalLayout/layout";
import { Button } from "@components/ui/button";
import { RadioGroup } from "@components/ui/radio-group";
import { useUserStore } from "@/entities/user/useUserStore";
import DeliveryPointItem from "@components/cards/DeliveryPointItem/DeliveryPointItem";
import { DeliveryPoint } from "@/types/DeliveryPoint";
import { routes } from "@/configs/routes";
import { useRouter } from "next/navigation"

interface ChooseDeliveryPointModalProps {
	onClose: () => void;
}

export const ChooseDeliveryPointModal = ({
	onClose,
}: ChooseDeliveryPointModalProps) => {
	const { user } = useUserStore();
	const router  = useRouter();

	const deliveryPoints = user?.deliveryPoints || [];
	const [selectedPointId, setSelectedPointId] = useState<number | null>(null);

	const handleConfirm = () => {
		if (selectedPointId !== null) {
			console.log("selectedPointId", selectedPointId);
			router.push(routes.deliveryPoints())
			onClose();
		}
	};

	return (
		<ModalsLayout title="Выбор пункта выдачи" onClose={onClose}>
			<div className={styles.ChooseDeliveryPointModal}>
				{deliveryPoints.length > 0 ? (
					<RadioGroup
						value={selectedPointId?.toString()}
						onValueChange={(value) => setSelectedPointId(Number(value))}
						className={styles.radioGroup}
					>
						{deliveryPoints.map((point: DeliveryPoint) => (
							<DeliveryPointItem
								key={point.id}
								point={point}
								radio
								selected={selectedPointId === point.id}
								onSelect={setSelectedPointId}
							/>
						))}
					</RadioGroup>
				) : (
					<p className={styles.noResults}>Ничего не найдено</p>
				)}

				<Button className={styles.btn} onClick={handleConfirm} disabled={selectedPointId === null}>
					Заберу отсюда
				</Button>
			</div>
		</ModalsLayout>
	);
};
