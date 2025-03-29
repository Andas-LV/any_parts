import React, { useState } from "react";
import styles from "./SellsList.module.css";
import SearchBar from "@components/SearchBar/SearchBar";
import CountryFilter from "@/app/(pages)/admin/(Tabs)/AdminMainPage/CountryFilter/CountryFilter";
import SellsTable from "@/widgets/tables/SellsTable/SellsTable";
import { useUserStore } from "@/entities/user/useUserStore";
import { useAdminMarketsStore } from "@/entities/admin/markets/useAdminMarketsStore";
import { useCurrencySymbol } from "@/hooks/useCurrency";

export default function SellsList() {
	const { user } = useUserStore();
	const { filteredSells } = useAdminMarketsStore();
	const [search, setSearch] = useState("");

	const currencySymbol = user ? useCurrencySymbol(user.currency) : "";

	const displayedSells = filteredSells().filter((sell) =>
		sell.market.marketName?.toLowerCase().includes(search.toLowerCase()) ||
		sell.item.productName?.toLowerCase().includes(search.toLowerCase()),
	);

	return (
		<div className={styles.SellsList}>
			<div className={styles.header}>
				<h2>Список магазинов</h2>

				<div className={styles.actions}>
					<SearchBar
						search={search}
						placeholder={"Название магазина, товара"}
						onSearchChange={(e) => setSearch(e.target.value)}
					/>
					<CountryFilter/>
				</div>
			</div>

			<SellsTable sellsData={displayedSells} currencySymbol={currencySymbol}/>
		</div>
	);
}
