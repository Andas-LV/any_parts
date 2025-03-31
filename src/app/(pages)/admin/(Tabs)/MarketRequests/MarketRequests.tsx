import React, { useState } from "react";
import styles from "./MarketRequests.module.css";
import MarketRequestsTable from "@/widgets/tables/MarketRequestsTable/MarketRequestsTable";
import SearchBar from "@components/SearchBar/SearchBar";
import CountryFilter from "@/app/(pages)/admin/(Tabs)/AdminMainPage/CountryFilter/CountryFilter";
import { filterBySearch } from "@/utils/filterBySearch";
import { useAdminMarketsStore } from "@/entities/admin/markets/useAdminMarketsStore";

export default function MarketRequests() {
	const { filteredMarketRequests } = useAdminMarketsStore();

	const [search, setSearch] = useState("");

	const displayedMarkets = filterBySearch(filteredMarketRequests(), search, [
		"marketName",
	]);

	return (
		<div className={styles.MarketRequests}>
			<h1>Входящие заявки</h1>

			<div className={styles.actions}>
				<SearchBar
					search={search}
					placeholder={"Название магазина"}
					onSearchChange={(e) => setSearch(e.target.value)}
				/>
				<CountryFilter />
			</div>

			<MarketRequestsTable
				displayedMarkets={displayedMarkets}
			/>
		</div>
	);
}
