"use client"
import styles from "./ShoppingStats.module.css";
import SellsList from "@/app/(pages)/admin/(Tabs)/AdminMainPage/(Tabs)/ShoppingStats/SellsList/SellsList";
import SellsStatistics
	from "@/app/(pages)/admin/(Tabs)/AdminMainPage/(Tabs)/ShoppingStats/SellsStatistics/SellsStatistics";

export default function ShoppingStats() {
	return (
		<div className={styles.ShoppingStats}>
			<SellsStatistics/>
			<SellsList/>
		</div>
	);
}
