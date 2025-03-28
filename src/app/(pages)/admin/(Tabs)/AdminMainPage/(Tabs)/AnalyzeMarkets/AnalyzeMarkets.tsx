import React from "react";
import styles from "./AnalyzeMarkets.module.css";
import MarketsStatistics from "@/app/(pages)/admin/(Tabs)/AdminMainPage/MarketsStatistics/MarketsStatistics";
import MarketsList from "@/app/(pages)/admin/(Tabs)/AdminMainPage/MarketsList/MarketsList";

export default function AnalyzeMarkets() {
	return (
		<div className={styles.AnalyzeMarkets}>
			<MarketsStatistics/>
			<MarketsList/>
		</div>
	);
}
