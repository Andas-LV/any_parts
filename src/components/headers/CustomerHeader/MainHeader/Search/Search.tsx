"use client";

import { useState } from "react";
import styles from "./search.module.css";
import { Search as SearchIcon } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/assets/svg/svg";
import { itemSearchTypes } from "@/constants/item";
import { exampleSearchKeyWords } from "@/exampleData/exampleFilters";
import { useRouter } from "next/navigation";
import { routes } from "@/configs/routes";

export interface ISearchParams {
	value: string;
	name: string;
}

export default function Search() {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedSort, setSelectedSort] = useState(itemSearchTypes[0].value);
	const [query, setQuery] = useState("");

	const router = useRouter();

	const selectedSortName =
		itemSearchTypes.find((sort) => sort.value === selectedSort)?.name ||
		"Выберите сортировку";

	const placeholder =
		selectedSort === itemSearchTypes[0].value
			? "Поиск по объявлениям"
			: "Поиск по VIN коду";

	const filteredSearchResults = exampleSearchKeyWords.filter((item) =>
		item.name.toLowerCase().startsWith(query.toLowerCase()),
	);

	const goToSearch = (item: ISearchParams) => {
		router.push(routes.searchedPage({ value: item.value, name: item.name }));
	};

	return (
		<div className={styles.searchSection}>
			<div className={styles.searchWrapper}>
				<DropdownMenu onOpenChange={setIsOpen}>
					<DropdownMenuTrigger className={styles.categorySelect}>
						{selectedSortName}
						<Icons.ArrowDown
							className={`${styles.arrowIcon} ${isOpen ? styles.rotated : ""}`}
						/>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						{itemSearchTypes.map((sort) => (
							<DropdownMenuItem
								key={sort.value}
								onSelect={() => setSelectedSort(sort.value)}
							>
								{sort.name}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>

				<div className={styles.searchInputWrapper}>
					<input
						type="text"
						placeholder={placeholder}
						className={styles.searchInput}
						value={query}
						onChange={(e) => setQuery(e.target.value)} // Update query on input change
					/>
					<SearchIcon className={styles.searchIcon} />

					{query && filteredSearchResults.length > 0 && (
						<div className={styles.suggestions}>
							{filteredSearchResults.map((item) => (
								<div
									onClick={() => goToSearch(item)}
									key={item.value}
									className={styles.suggestionItem}
								>
									{item.name}
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
