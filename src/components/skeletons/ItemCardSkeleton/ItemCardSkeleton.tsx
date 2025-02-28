import { Skeleton } from "@/components/ui/skeleton";
import styles from "./ItemCardSkeleton.module.css";

export default function ItemCardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Skeleton className={styles.image} />
      </div>

      <div className={styles.content}>
        <Skeleton className={styles.priceInfo} />

        <h3 className={styles.title}>
          <Skeleton className={styles.skeletonText} />
        </h3>

        <div className={styles.ratingWrapper}>
          <div className={styles.rating}>
            <Skeleton className={styles.rating} />
          </div>
          <div className={styles.comments}>
            <Skeleton className={styles.skeletonText} />
          </div>
        </div>

        <div className={styles.actions}>
          <Skeleton className={styles.cartButton} />
          <Skeleton className={styles.favoriteButton} />
        </div>
      </div>
    </div>
  );
}
