import React from "react";
import styles from "./PreviewItem.module.css";
import { useCreateItemStore } from "@/entities/items/useCreateItemStore";

interface PreviewItemProps {}

export default function PreviewItem() {
	const { fullInfo } = useCreateItemStore();

	return (
		<div className={styles.PreviewItem}>
			<img
				src={fullInfo?.images[0]}
				alt={fullInfo?.productName}
				className={styles.image}
			/>
		</div>
	);
}
