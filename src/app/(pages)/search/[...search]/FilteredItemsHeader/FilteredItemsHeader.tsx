"use client";

import { Icons } from "@/assets/svg";
import styles from "./filterHeader.module.css";
import { useFiltersStore } from "@/entities/items/useFiltersStore";
import { MIN_PRICE, MAX_PRICE } from "@/exampleData/exampleFilters";
import { useCurrencySymbol } from "@/hooks/useCurrency";
import { useUserStore } from "@/entities/user/useUserStore";

export default function FilteredItemsHeader() {
	const {
		sale,
		setSale,
		highRated,
		setHighRated,
		selectedBrands,
		setSelectedBrands,
		priceRange,
		setPriceRange,
		selectedTypes,
		setSelectedTypes,
		selectedColors,
		setSelectedColors,
		selectedManufacturers,
		setSelectedManufacturers,
	} = useFiltersStore();

	const { user } = useUserStore();

	const isPriceChanged =
		priceRange[0] !== MIN_PRICE || priceRange[1] !== MAX_PRICE;

	const removeSale = () => setSale(false);
	const removeHighRated = () => setHighRated(false);

	const removeBrand = (brand: string) => {
		setSelectedBrands(selectedBrands.filter((b) => b !== brand));
	};

	const removeType = (type: string) => {
		setSelectedTypes(selectedTypes.filter((t) => t !== type));
	};

	const removeColor = (color: string) => {
		setSelectedColors(selectedColors.filter((c) => c !== color));
	};

	const removeManufacturer = (man: string) => {
		setSelectedManufacturers(selectedManufacturers.filter((m) => m !== man));
	};

	const resetPriceRange = () => {
		setPriceRange([MIN_PRICE, MAX_PRICE]);
	};

	const priceLabel = `
    от ${priceRange[0]} ${user && useCurrencySymbol(user.currency)} 
    до ${priceRange[1]} ${user && useCurrencySymbol(user.currency)}`;

	const chips = [];

	if (sale) {
		chips.push(
			<div key="sale" className={styles.chip}>
				Распродажа
				<Icons.PrimaryClose className={styles.closeBtn} onClick={removeSale} />
			</div>,
		);
	}

	if (highRated) {
		chips.push(
			<div key="highRated" className={styles.chip}>
				Рейтинг: 4.5+
				<Icons.PrimaryClose
					className={styles.closeBtn}
					onClick={removeHighRated}
				/>
			</div>,
		);
	}

	selectedBrands.forEach((brand) => {
		chips.push(
			<div key={`brand-${brand}`} className={styles.chip}>
				{brand}
				<Icons.PrimaryClose
					className={styles.closeBtn}
					onClick={() => removeBrand(brand)}
				/>
			</div>,
		);
	});

	selectedTypes.forEach((type) => {
		chips.push(
			<div key={`type-${type}`} className={styles.chip}>
				{type}
				<Icons.PrimaryClose
					className={styles.closeBtn}
					onClick={() => removeType(type)}
				/>
			</div>,
		);
	});

	selectedColors.forEach((color) => {
		chips.push(
			<div key={`color-${color}`} className={styles.chip}>
				{color}
				<Icons.PrimaryClose
					className={styles.closeBtn}
					onClick={() => removeColor(color)}
				/>
			</div>,
		);
	});

	selectedManufacturers.forEach((man) => {
		chips.push(
			<div key={`man-${man}`} className={styles.chip}>
				{man}
				<Icons.PrimaryClose
					className={styles.closeBtn}
					onClick={() => removeManufacturer(man)}
				/>
			</div>,
		);
	});

	if (isPriceChanged) {
		chips.push(
			<div key="priceRange" className={styles.chip}>
				{priceLabel}
				<Icons.PrimaryClose
					className={styles.closeBtn}
					onClick={resetPriceRange}
				/>
			</div>,
		);
	}

	return (
		<div className={styles.wrapper}>
			{chips.length > 0 && <div className={styles.chipsContainer}>{chips}</div>}
		</div>
	);
}
