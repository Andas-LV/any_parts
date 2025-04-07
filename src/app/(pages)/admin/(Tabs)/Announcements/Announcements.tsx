"use client"

import React, { useState } from "react";
import styles from "./Announcements.module.css";
import AdminProductsCheckTable from "@/widgets/tables/AdminProductsCheckTable/AdminProductsCheckTable";
import { filterBySearch } from "@/utils/filterBySearch";
import SearchBar from "@components/SearchBar/SearchBar";
import { useAdminItemsStore } from "@/entities/admin/items/useAdminItemsStore";
import { useUserStore } from "@/entities/user/useUserStore";

export default function Announcements() {
	const { currencySymbol } = useUserStore();
	const { allItems } = useAdminItemsStore();

	const [search, setSearch] = useState("");

	const displayedMarkets = filterBySearch(allItems, search, [
		"productName",
		"article",
		"barcode",
	]);

	return (
		<div className={styles.Announcements}>
			<h1>Список объявлений</h1>

			<div className={styles.search}>
				<SearchBar
					search={search}
					placeholder={"Название, артикул, штрихкод"}
					onSearchChange={(e) => setSearch(e.target.value)}
				/>
			</div>

			<AdminProductsCheckTable
				filteredItems={displayedMarkets}
				currencySymbol={currencySymbol}
			/>
		</div>
	);
}
