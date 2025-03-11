import React from "react";
import styles from "./ActionBlockSkeleton.module.css";
import { Skeleton } from "@/components/ui/skeleton";

export default function ActionsBlockSkeleton() {
	return (
		<div className={styles.actionsBlockContainer}>
			<div className={styles.prices}>
				<div className={styles.leftSidePrice}>
					<Skeleton className={styles.actualPrice} />
					<div className={styles.discountWrapper}>
						<Skeleton className={styles.oldPrice} />
						<Skeleton className={styles.discount} />
					</div>
				</div>
				<div className={styles.rightSidePrice}>
					<Skeleton className={styles.apPrice} />
					<Skeleton className={styles.apText} />
				</div>
			</div>

			<div className={styles.chartWrapper}>
				<div className={styles.priceRange}>
					<Skeleton className={styles.chartPlaceholder} />
				</div>
				<Skeleton className={styles.arrowRight} />
			</div>

			<div className={styles.actionButtons}>
				<Skeleton className={styles.basket} />
				<Skeleton className={styles.buyNow} />
			</div>

			<div className={styles.marketInfo}>
				<Skeleton className={styles.marketName} />
				<div className={styles.marketRating}>
					<Skeleton className={styles.marketRatingIcon} />
					<Skeleton className={styles.marketRatingText} />
					<Skeleton className={styles.marketArrowDown} />
				</div>
			</div>
		</div>
	);
}
