import { Skeleton } from "@/components/ui/skeleton";
import styles from "./BasketCardSkeleton.module.css";

export default function BasketCardSkeleton() {
	return (
		<div className={styles.card}>
			<div className={styles.checkboxContainer}>
				<Skeleton className={styles.checkbox} />
			</div>

			<label className={styles.cardContent}>
				<div className={styles.imageContainer}>
					<Skeleton className={styles.image} />
				</div>

				<div className={styles.mainInfo}>
					<div className={styles.cardHeader}>
						<Skeleton className={styles.cardName} />
						<div className={styles.priceContainer}>
							<Skeleton className={styles.mainPrice} />
							<Skeleton className={styles.priceInfo} />
						</div>
					</div>

					<Skeleton className={styles.colorText} />
					<Skeleton className={styles.quantity} />

					<div className={styles.actionButtons}>
						<Skeleton className={styles.favoriteButton} />
						<Skeleton className={styles.deleteButton} />
						<Skeleton className={styles.buyButton} />
					</div>
				</div>

				<div className={styles.rightSideContent}>
					<div className={styles.quantityContainer}>
						<Skeleton className={styles.quantityActionBtn} />
						<Skeleton className={styles.quantityActionBtn} />
					</div>
				</div>
			</label>
		</div>
	);
}
