import React from "react";
import styles from "./MainInfoSkeleton.module.css";
import { Skeleton } from "@components/ui/skeleton";

export default function MainInfoSkeleton() {
	return (
		<div className={styles.itemInfoContainer}>
			{/* Заголовок */}
			<Skeleton className={styles.heading} />

			{/* Блок рейтингов */}
			<div className={styles.ratings}>
				<Skeleton className={styles.rating} />
				<Skeleton className={styles.comments} />
				<Skeleton className={styles.sold} />
			</div>

			{/* Кнопки переключения вкладок */}
			<div className={styles.linkBtns}>
				<Skeleton className={styles.btn} />
				<Skeleton className={styles.btn} />
			</div>

			{/* Превью изображений */}
			<div className={styles.imagesOption}>
				{[...Array(4)].map((_, index) => (
					<Skeleton key={index} className={styles.thumbnail} />
				))}
			</div>

			{/* Характеристики */}
			<div className={styles.characteristics}>
				{[...Array(4)].map((_, index) => (
					<div key={index} className={styles.characteristic}>
						<Skeleton className={styles.label} />
						<Skeleton className={styles.value} />
					</div>
				))}
			</div>

			{/* Кнопка "Все характеристики" */}
			<Skeleton className={styles.fullCharsLink} />
		</div>
	);
}
