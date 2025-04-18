"use client";

import React, { useState } from "react";
import styles from "./ItemsLists.module.css";
import { useUserStore } from "@/entities/user/useUserStore";
import SearchBar from "@components/SearchBar/SearchBar";
import { Button } from "@components/ui/button";
import { Plus } from "lucide-react";
import ProductTable from "@/widgets/tables/ProductTable/ProductTable";
import { useDealerItemsStore } from "@/entities/partners/items/useDealerItemsStore";

export default function ItemsLists() {
	const { currencySymbol } = useUserStore();
	const { allItems } = useDealerItemsStore();

	const [search, setSearch] = useState("");

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
						placeholder={"Название, артикул, штрихкод"}
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
