import React, { useState } from "react";
import { Button } from "@components/ui/button";
import { Plus } from "lucide-react";
import SearchBar from "@components/SearchBar/SearchBar";
import StatusFilter from "./StatusFilter/StatusFilter";
import ProductTable from "@/widgets/tables/ProductTable/ProductTable";
import { useUserStore } from "@/entities/user/useUserStore";
import { useCurrencySymbol } from "@/hooks/useCurrency";
import styles from "./PartnerItemsList.module.css";
import { useDealerItemsStore } from "@/entities/partners/items/useDealerItemsStore";
import { partnerItemStatuses } from "@/constants/status";

export default function PartnerItemsList() {
	const { user, setActivePartnersTab } = useUserStore();
	const { filteredItems } = useDealerItemsStore();
	const [search, setSearch] = useState("");

	const currencySymbol = user ? useCurrencySymbol(user.currency) : "";

	const displayedItems = filteredItems().filter(
		(item) =>
			item.productName.toLowerCase().includes(search.toLowerCase()) ||
			item.article.toLowerCase().includes(search.toLowerCase()) ||
			item.barcode.toLowerCase().includes(search.toLowerCase()),
	);

	return (
		<div className={styles.PartnerItemsList}>
			<div className={styles.header}>
				<h2>Список товаров</h2>

				<div className={styles.actions}>
					<SearchBar
						search={search}
						placeholder={"Название, артикул, штрихкод"}
						onSearchChange={(e) => setSearch(e.target.value)}
					/>
					<StatusFilter statuses={partnerItemStatuses} />
					<Button
						onClick={() => {
							setActivePartnersTab("items");
						}}
						className={"rounded-xl"}
					>
						<Plus /> Добавить товар
					</Button>
				</div>
			</div>

			<ProductTable
				filteredItems={displayedItems}
				currencySymbol={currencySymbol}
			/>
		</div>
	);
}
