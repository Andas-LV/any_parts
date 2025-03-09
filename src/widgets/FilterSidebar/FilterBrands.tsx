"use client";

import { useState } from "react";
import { Checkbox } from "@components/ui/checkbox";
import { Label } from "@components/ui/label";
import { Button } from "@components/ui/button";
import styles from "./filterSidebar.module.css";
import { Search as SearchIcon } from "lucide-react";
import { Brand } from "@/types/Filters";
import { useFiltersStore } from "@/entities/items/useFiltersStore";
import { exampleBrands } from "@/exampleData/exampleFilters";

export function FilterBrands() {
	const { brandSearch, selectedBrands, setBrandSearch, setSelectedBrands } =
		useFiltersStore();
	const [showAll, setShowAll] = useState(false);

	const filteredBrands = exampleBrands.filter((brand: Brand) =>
		brand.label.toLowerCase().includes(brandSearch.toLowerCase()),
	);

	const handleBrandChange = (brandValue: string) => {
		if (selectedBrands.includes(brandValue)) {
			setSelectedBrands(selectedBrands.filter((b) => b !== brandValue));
		} else {
			setSelectedBrands([...selectedBrands, brandValue]);
		}
	};

	const brandsToShow = showAll ? filteredBrands : filteredBrands.slice(0, 5);

	return (
		<div className={styles.section}>
			<h3 className={styles.sectionTitle}>Бренды</h3>
			<div className={styles.searchWrapper}>
				<SearchIcon className={styles.searchIcon} />
				<input
					value={brandSearch}
					onChange={(e) => setBrandSearch(e.target.value)}
					type="text"
					placeholder="Поиск..."
					className={styles.searchInput}
				/>
			</div>
			<div className={styles.checkboxesList}>
				{brandsToShow.map((brand: Brand) => (
					<div key={brand.value} className={styles.checkboxItem}>
						<Checkbox
							id={brand.value}
							checked={selectedBrands.includes(brand.value)}
							className={styles.checkbox}
							onCheckedChange={() => handleBrandChange(brand.value)}
						/>
						<Label htmlFor={brand.value}>{brand.label}</Label>
					</div>
				))}
			</div>
			{filteredBrands.length > 5 && (
				<Button
					variant="link"
					className={styles.showAllBtn}
					onClick={() => setShowAll((prev) => !prev)}
				>
					{showAll ? "Свернуть" : "Показать всё"}
				</Button>
			)}
		</div>
	);
}
