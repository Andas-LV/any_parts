import { Skeleton } from "@/components/ui/skeleton";
import styles from "./ListedCardSkeleton.module.css";

export default function ListedCardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Skeleton className={styles.image} />
      </div>

      <div className={styles.mainInfo}>
        <div className={styles.titleHeader}>
          <Skeleton className={styles.title} />
        </div>

        {/* Цены */}
        <div className={styles.priceContainer}>
          <Skeleton className={styles.mainPrice} />
          <Skeleton className={styles.priceInfo} />
          <Skeleton className={styles.apPrice} />
        </div>

        {/* Характеристики */}
        <div className={styles.characteristics}>
          <Skeleton className={styles.characteristic} />
          <Skeleton className={styles.characteristic} />
          <Skeleton className={styles.characteristic} />
        </div>

        <Skeleton className={styles.allDetails} />
      </div>

      <div className={styles.rightSideContent}>
        <Skeleton className={styles.marketName} />

        <div className={styles.stats}>
          <Skeleton className={styles.ratingValue} />
          <Skeleton className={styles.ratingStars} />
          <Skeleton className={styles.commentsValue} />
        </div>

        <Skeleton className={styles.cartButton} />
      </div>
    </div>
  );
}
