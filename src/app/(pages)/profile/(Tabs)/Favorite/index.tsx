"use client";

import styles from "./page.module.css";
import { useItemsStore } from "@/entities/items/useItemsStore";
import React, { useEffect, useState, useMemo } from "react";
import { Button } from "@components/ui/button";
import { useRouter } from "next/navigation";
import ItemCard from "@components/cards/ItemCards/ItemCard/ItemCard";
import { Icons } from "@/assets/svg";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { itemSorts } from "@/constants/item";
import { routes } from "@/configs/routes";
import SearchBar from "@components/SearchBar/SearchBar";

export default function Favorite() {
	const { getFavoriteItems, favoriteItems } = useItemsStore();
	const router = useRouter();

	const [search, setSearch] = useState("");
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [selectedSort, setSelectedSort] = useState(itemSorts[0].value);

	const selectedSortName =
		itemSorts.find((sort) => sort.value === selectedSort)?.name ||
		"Выберите сортировку";
	const isFavoriteItems = favoriteItems && favoriteItems.length > 0;

	useEffect(() => {
		getFavoriteItems();
	}, []);

	const filteredItems = useMemo(() => {
		return (
			favoriteItems?.filter((item) =>
				item.name.toLowerCase().includes(search.toLowerCase()),
			) || []
		);
	}, [search, favoriteItems]);

	return (
		<div className={styles.wrapper}>
			<h2>Избранное</h2>
			{isFavoriteItems ? (
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
									{itemSorts.map((sort) => (
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

					<div className={styles.itemsWrapper}>
						{filteredItems.length > 0 ? (
							filteredItems.map((item) => (
								<ItemCard key={item.id} showFavorite={false} item={item} />
							))
						) : (
							<p className={styles.noResults}>Ничего не найдено</p>
						)}
					</div>
				</div>
			) : (
				<div className={styles.noFavoriteWrapper}>
					<div className={styles.noFavoriteTitle}>В избранном пока пусто</div>
					<p>
						Сохраняйте товары, которые понравились, <br /> чтобы долго не искать
					</p>

					<Button
						onClick={() => router.push(routes.home())}
						className={styles.toMainBtn}
					>
						Перейти на главную
					</Button>
				</div>
			)}
		</div>
	);
}
