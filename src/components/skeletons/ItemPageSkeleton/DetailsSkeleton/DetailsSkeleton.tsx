import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import styles from "./DetailsSkeleton.module.css";

export default function DetailsSkeleton() {
	return (
		<div className={styles.details}>
			{/* Блок описания */}
			<div className={styles.description}>
				{/* Заголовок "Описание" */}
				<Skeleton className={styles.heading} />
				{/* Несколько строк текста */}
				<Skeleton className={styles.text} />
				<Skeleton className={styles.text} />
				<Skeleton className={styles.text} />
				{/* Кнопка "Смотреть полностью" */}
				<Skeleton className={styles.toggleButton} />
			</div>

			{/* Блок характеристик */}
			<div className={styles.characteristicsWrapper}>
				{/* Заголовок "Характеристики" */}
				<Skeleton className={styles.heading} />
				<div className={styles.characteristics}>
					{[...Array(4)].map((_, index) => (
						<div key={index} className={styles.characteristic}>
							<Skeleton className={styles.label} />
							<div className={styles.dots} />
							<Skeleton className={styles.value} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
