import React from "react";
import styles from "./ImagesSkeleton.module.css";
import { Skeleton } from "@components/ui/skeleton";

export default function ImagesSkeleton() {
	return (
		<div className={styles.imageContainer}>
			<Skeleton className={styles.image} />
		</div>
	);
}
