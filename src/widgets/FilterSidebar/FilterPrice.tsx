"use client";

import { Slider } from "@components/ui/slider";
import styles from "./filterSidebar.module.css";
import React from "react";
import { useFiltersStore } from "@/entities/items/useFiltersStore";
import { MIN_PRICE, MAX_PRICE } from "@/exampleData/exampleFilters";
import { useCurrencySymbol } from "@/hooks/useCurrency";
import { useUserStore } from "@/entities/user/useUserStore";

export function FilterPrice() {
	const { priceRange, setPriceRange } = useFiltersStore();
	const { user } = useUserStore();

	const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newMin = Number(e.target.value);
		setPriceRange([newMin, priceRange[1]]);
	};

	const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newMax = Number(e.target.value);
		setPriceRange([priceRange[0], newMax]);
	};

	return (
		<div className={styles.section}>
			<h3 className={styles.sectionTitle}>Цена</h3>
			<div className={styles.sliderContainer}>
				<Slider
					defaultValue={[MIN_PRICE, MAX_PRICE]}
					value={priceRange}
					min={MIN_PRICE}
					max={MAX_PRICE}
					step={1000}
					onValueChange={(val) => setPriceRange(val)}
				/>
			</div>
			<div className={styles.inputRow}>
				<input
					type="number"
					placeholder={`${MIN_PRICE.toString()} ${user && useCurrencySymbol(user.currency)} `}
					value={priceRange[0]}
					onChange={handleMinChange}
					className={styles.input}
					maxLength={6}
				/>
				<input
					type="number"
					placeholder={`${MAX_PRICE.toString()} ${user && useCurrencySymbol(user.currency)} `}
					value={priceRange[1]}
					onChange={handleMaxChange}
					className={styles.input}
					maxLength={6}
				/>
			</div>
		</div>
	);
}
