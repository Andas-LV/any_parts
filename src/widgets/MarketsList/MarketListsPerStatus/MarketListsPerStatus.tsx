import React from "react";
import styles from "./MarketListsPerStatus.module.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import AnalyzeMarkets from "@/app/(pages)/admin/(Tabs)/AdminMainPage/(Tabs)/AnalyzeMarkets/AnalyzeMarkets";
import ShoppingStats from "@/app/(pages)/admin/(Tabs)/AdminMainPage/(Tabs)/ShoppingStats/ShoppingStats";
import { MarketStatuses, TMarketsList } from "@/types/admin/Markets";
import MarketsTable from "@/widgets/tables/MarketsTable/MarketsTable";

interface MarketListsPerStatusProps {
	displayedMarkets: TMarketsList[];
	currencySymbol: string;
}

export default function MarketListsPerStatus({
	displayedMarkets,
	currencySymbol,
}: MarketListsPerStatusProps) {
	return (
		<div className={styles.MarketListsPerStatus}>
			<Tabs defaultValue="all" className="h-full">
				<TabsList className={styles.tabsList}>
					<TabsTrigger value="all" className={styles.tabsTrigger}>
						Все магазины <span className={styles.marketsLength}> {displayedMarkets.length}</span>
					</TabsTrigger>

					<TabsTrigger value="active" className={styles.tabsTrigger}>
						Активный
					</TabsTrigger>

					<TabsTrigger value="notStarted" className={styles.tabsTrigger}>
						Ещё не начал
					</TabsTrigger>

					<TabsTrigger value="archive" className={styles.tabsTrigger}>
						Архив
					</TabsTrigger>

					<TabsTrigger value="notActive" className={styles.tabsTrigger}>
						Не активный
					</TabsTrigger>
				</TabsList>

				<TabsContent value="all" className={styles.tabsContent}>
					<MarketsTable
						filteredMarkets={displayedMarkets}
						currencySymbol={currencySymbol}
					/>
				</TabsContent>

				<TabsContent value="active" className={styles.tabsContent}>
					<MarketsTable
						status={"Активный" as MarketStatuses}
						filteredMarkets={displayedMarkets}
						currencySymbol={currencySymbol}
					/>
				</TabsContent>

				<TabsContent value="notStarted" className={styles.tabsContent}>
					<MarketsTable
						status={"Ещё не начал" as MarketStatuses}
						filteredMarkets={displayedMarkets}
						currencySymbol={currencySymbol}
					/>
				</TabsContent>
				<TabsContent value="archive" className={styles.tabsContent}>
					<MarketsTable
						status={"В архиве" as MarketStatuses}
						filteredMarkets={displayedMarkets}
						currencySymbol={currencySymbol}
					/>
				</TabsContent>
				<TabsContent value="notActive" className={styles.tabsContent}>
					<MarketsTable
						status={"Не продает" as MarketStatuses}
						filteredMarkets={displayedMarkets}
						currencySymbol={currencySymbol}
					/>
				</TabsContent>
			</Tabs>
		</div>
	);
}
