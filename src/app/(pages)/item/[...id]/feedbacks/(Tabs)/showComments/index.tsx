"use client";

import styles from "./showComments.module.css";
import { CommentsSection } from "./comments";
import { PhotosSection } from "./photos";

export function ShowComments() {
	return (
		<div className={styles.wrapper}>
			<CommentsSection />
			<PhotosSection />
		</div>
	);
}
