import React from "react";
import styles from "./Markets.module.css";
import MarketsList from "@/widgets/MarketsList/MarketsList";

export default function Markets() {
	return (
		<div className={styles.Markets}>
			<MarketsList listWithTabs />
		</div>
	);
}
