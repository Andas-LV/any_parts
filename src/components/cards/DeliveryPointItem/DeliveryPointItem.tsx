import React from "react";
import { RadioGroupItem } from "@components/ui/radio-group";
import styles from "./DeliveryPointItem.module.css";
import { DeliveryPoint } from "@/types/DeliveryPoint";

interface DeliveryPointItemProps {
	point: DeliveryPoint;
	radio?: boolean;
	selected?: boolean;
	onSelect?: (id: number) => void;
}

export const DeliveryPointItem = ({
	point,
	radio,
	selected,
	onSelect,
}: DeliveryPointItemProps) => {
	const handleClick = () => {
		onSelect?.(point.id);
	};

	return (
		<label className={styles.DeliveryPointItem}>
			{radio && (
				<RadioGroupItem
					value={point.id.toString()}
					className={styles.radioButton}
					checked={selected}
				/>
			)}

			<div className={styles.deliveryPoint} onClick={handleClick}>
				<div className={styles.address}>{point.address}</div>
				<div className={styles.workingTime}>
					{point.workingTime.days}: {point.workingTime.open} -{" "}
					{point.workingTime.close}
				</div>
			</div>
		</label>
	);
};

export default DeliveryPointItem;
