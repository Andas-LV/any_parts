import React from "react";
import styles from "./AnalyzeMarkets.module.css";
import MarketsStatistics from "./MarketsStatistics/MarketsStatistics";
import MarketsList from "@/widgets/MarketsList/MarketsList";

export default function AnalyzeMarkets() {
	return (
		<div className={styles.AnalyzeMarkets}>
			<MarketsStatistics/>
			<MarketsList listWithTabs={false}/>
		</div>
	);
}
