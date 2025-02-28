import { Skeleton } from "@/components/ui/skeleton";
import styles from "./OrderCardSkeleton.module.css";
import { Card, CardContent, CardFooter, CardHeader } from "@components/ui/card";

export default function OrderCardSkeleton() {
  return (
    <Card className={styles.card}>
      <CardHeader className={styles.orderCardHeader}>
        <Skeleton className={styles.image} />
        <div className={styles.headerDetails}>
          <Skeleton className={styles.cardTitle} />
          <Skeleton className={styles.cardDescription} />
          <Skeleton className={styles.status} />
        </div>
      </CardHeader>

      <CardContent>
        <div className={styles.detailWrapper}>
          <Skeleton className={styles.icon} />
          <div className={styles.detailInfo}>
            <Skeleton className={styles.label} />
            <Skeleton className={styles.value} />
          </div>
        </div>

        <div className={styles.detailWrapper}>
          <Skeleton className={styles.icon} />
          <div className={styles.detailInfo}>
            <Skeleton className={styles.label} />
            <Skeleton className={styles.value} />
            <Skeleton className={styles.link} />
          </div>
        </div>

        <div className={styles.detailWrapper}>
          <Skeleton className={styles.icon} />
          <div className={styles.detailInfo}>
            <Skeleton className={styles.label} />
            <Skeleton className={styles.value} />
          </div>
        </div>

        <div className={styles.detailWrapper}>
          <Skeleton className={styles.icon} />
          <div className={styles.detailInfo}>
            <Skeleton className={styles.label} />
            <Skeleton className={styles.value} />
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Skeleton className={styles.button} />
      </CardFooter>
    </Card>
  );
}
