import styles from "./PreviewItem.module.css";
import MainContent from "./mainContent";
import Details from "./details";
import React from "react";

export default function PreviewItem() {
	return (
		<div className={styles.PreviewItem}>
			<MainContent />
			<Details />
		</div>
	);
}
