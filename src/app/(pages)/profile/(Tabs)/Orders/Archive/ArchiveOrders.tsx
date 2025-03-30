"use client";

import styles from "./archiveOrders.module.css";
import { Icons } from "@/assets/svg/svg";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { ordersSorts } from "@/constants/orders";
import OrderCard from "@components/cards/OrderCard/OrderCard";
import React, { useMemo, useState } from "react";
import { useOrdersStore } from "@/entities/customer/orders/useOrdersStore";
import SearchBar from "@components/SearchBar/SearchBar";

export default function ArchiveOrders() {
	const { orders } = useOrdersStore();

	const [search, setSearch] = useState("");
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [selectedSort, setSelectedSort] = useState(ordersSorts[0].value);
	const selectedSortName =
		ordersSorts.find((sort) => sort.value === selectedSort)?.name ||
		"Выберите сортировку";

	const filteredOrders = useMemo(() => {
		return (
			orders?.filter(
				(item) =>
					item.name.toLowerCase().includes(search.toLowerCase()) ||
					item.orderId.toString().includes(search),
			) || []
		);
	}, [search, orders]);

	return (
		<div className={styles.content}>
			<div className={styles.searchSection}>
				<SearchBar
					search={search}
					placeholder={"Поиск..."}
					onSearchChange={(e) => setSearch(e.target.value)}
				/>

				<div className={styles.filter}>
					<Icons.ArrowsDownUp />
					<DropdownMenu onOpenChange={setIsFilterOpen}>
						<DropdownMenuTrigger className={styles.categorySelect}>
							{selectedSortName}
							<Icons.ArrowDown
								className={`${styles.arrowIcon} ${isFilterOpen ? styles.rotated : ""}`}
							/>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							{ordersSorts.map((sort) => (
								<DropdownMenuItem
									key={sort.value}
									onSelect={() => setSelectedSort(sort.value)}
								>
									{sort.name}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			<div className={styles.ordersGrid}>
				{filteredOrders.map((order, index) => (
					<OrderCard key={index} order={order} />
				))}
			</div>
		</div>
	);
}
