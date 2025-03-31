"use client";

import React, { useState } from "react";
import styles from "./MarketsList.module.css";
import MarketsTable from "@/widgets/tables/MarketsTable/MarketsTable";
import { useCurrencySymbol } from "@/hooks/useCurrency";
import { useUserStore } from "@/entities/user/useUserStore";
import { useAdminMarketsStore } from "@/entities/admin/markets/useAdminMarketsStore";
import SearchBar from "@components/SearchBar/SearchBar";
import CountryFilter from "@/app/(pages)/admin/(Tabs)/AdminMainPage/CountryFilter/CountryFilter";
import { filterBySearch } from "@/utils/filterBySearch";
import MarketListsPerStatus from "@/widgets/MarketsList/MarketListsPerStatus/MarketListsPerStatus";

interface MarketsListProps {
	listWithTabs: boolean;
}

export default function MarketsList({
	listWithTabs = false,
}: MarketsListProps) {
	const { user } = useUserStore();
	const { filteredMarkets } = useAdminMarketsStore();
	const [search, setSearch] = useState("");

	const currencySymbol = user ? useCurrencySymbol(user.currency) : "";

	const displayedMarkets = filterBySearch(filteredMarkets(), search, [
		"marketName",
	]);

	return (
		<div className={styles.MarketsList}>
			{listWithTabs && <h1>Список магазинов</h1>}

			<div className={styles.header}>
				{!listWithTabs && <h2>Список магазинов</h2>}

				<div className={styles.actions}>
					<SearchBar
						search={search}
						placeholder={"Название магазина"}
						onSearchChange={(e) => setSearch(e.target.value)}
					/>
					<CountryFilter />
				</div>
			</div>

			{listWithTabs && (
				<MarketListsPerStatus
					displayedMarkets={displayedMarkets}
					currencySymbol={currencySymbol}
				/>
			)}

			{!listWithTabs && (
				<MarketsTable
					filteredMarkets={displayedMarkets}
					currencySymbol={currencySymbol}
				/>
			)}
		</div>
	);
}
