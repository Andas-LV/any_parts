import React, { useState } from "react";
import { Button } from "@components/ui/button";
import { Plus } from "lucide-react";
import SearchBar from "./SearchBar/SearchBar";
import StatusFilter from "./StatusFilter/StatusFilter";
import ProductTable from "./ProductTable/ProductTable";
import { useUserStore } from "@/entities/user/useUserStore";
import { ItemStatusValues } from "@/types/partners/TableItem";
import { useCurrencySymbol } from "@/hooks/useCurrency";
import styles from "./PartnerItemsList.module.css";
import { useDealerItemsStore } from "@/entities/partners/items/useDealerItems";

export default function PartnerItemsList() {
	const { user } = useUserStore();
	const { tableItems } = useDealerItemsStore();

	const [search, setSearch] = useState("");
	const [selectedStatuses, setSelectedStatuses] = useState<ItemStatusValues[]>(
		[],
	);
	const currencySymbol = user ? useCurrencySymbol(user.currency) : "";

	const filteredItems = tableItems.filter(
		(item) =>
			selectedStatuses.every((status) => item.statuses.includes(status)) &&
			(item.productName.toLowerCase().includes(search.toLowerCase()) ||
				item.article.toLowerCase().includes(search.toLowerCase()) ||
				item.barcode.toLowerCase().includes(search.toLowerCase())),
	);

	return (
		<div className={styles.PartnerItemsList}>
			<div className={styles.header}>
				<h2>Список товаров</h2>

				<div className={styles.actions}>
					<SearchBar
						search={search}
						onSearchChange={(e) => setSearch(e.target.value)}
					/>
					<StatusFilter
						selectedStatuses={selectedStatuses}
						setSelectedStatuses={setSelectedStatuses}
					/>
					<Button>
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
