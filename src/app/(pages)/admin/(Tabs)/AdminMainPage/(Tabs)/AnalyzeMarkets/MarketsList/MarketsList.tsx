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

export default function MarketsList() {
	const { user } = useUserStore();
	const { filteredMarkets } = useAdminMarketsStore();
	const [search, setSearch] = useState("");

	const currencySymbol = user ? useCurrencySymbol(user.currency) : "";

	const displayedMarkets = filterBySearch(filteredMarkets(), search, ["marketName"]);

	return (
		<div className={styles.MarketsList}>
			<div className={styles.header}>
				<h2>Список магазинов</h2>

				<div className={styles.actions}>
					<SearchBar
						search={search}
						placeholder={"Название магазина"}
						onSearchChange={(e) => setSearch(e.target.value)}
					/>
					<CountryFilter/>
				</div>
			</div>

			<MarketsTable
				filteredMarkets={displayedMarkets}
				currencySymbol={currencySymbol}
			/>
		</div>
	);
}
