"use client";

import React, { useState } from "react";
import styles from "./ItemsLists.module.css";
import { useUserStore } from "@/entities/user/useUserStore";
import { useCurrencySymbol } from "@/hooks/useCurrency";
import SearchBar from "@/app/(pages)/partners/(Tabs)/MainPage/PartnerItemsList/SearchBar/SearchBar";
import { Button } from "@components/ui/button";
import { Plus } from "lucide-react";
import ProductTable from "@/app/(pages)/partners/(Tabs)/MainPage/PartnerItemsList/ProductTable/ProductTable";
import { useDealerItemsStore } from "@/entities/partners/items/useDealerItemsStore";

export default function ItemsLists() {
	const { user } = useUserStore();
	const { allItems } = useDealerItemsStore();

	const [search, setSearch] = useState("");

	const currencySymbol = user ? useCurrencySymbol(user.currency) : "";

	const filteredItems = allItems.filter(
		(item) =>
			item.productName.toLowerCase().includes(search.toLowerCase()) ||
			item.article.toLowerCase().includes(search.toLowerCase()) ||
			item.barcode.toLowerCase().includes(search.toLowerCase()),
	);

	return (
		<div className={styles.ItemsLists}>
			<h2>Список товаров</h2>

			<div className={styles.header}>
				<div className={styles.actions}>
					<SearchBar
						search={search}
						onSearchChange={(e) => setSearch(e.target.value)}
					/>
					<Button className={"rounded-xl"}>
						<Plus /> Добавить товар
					</Button>
				</div>
			</div>

			<ProductTable
				filteredItems={filteredItems}
				currencySymbol={currencySymbol}
			/>
		</div>
	);
}
