"use client";

import { useState, useEffect } from "react";
import styles from "./filterSidebar.module.css";

import { FilterSaleAndRating } from "./FilterSaleAndRating";
import { FilterBrands } from "./FilterBrands";
import { FilterPrice } from "./FilterPrice";
import { FilterTypes } from "./FilterTypes";
import { FilterColors } from "./FilterColors";
import { FilterManufacturers } from "./FilterManufacturers";

import {
    exampleBrands,
    exampleColors,
    exampleFilterTypes,
    exampleManufacturers,
    MAX_PRICE,
    MIN_PRICE,
} from "@/exampleData/exampleFilters";

export default function FilterSidebar() {
    const [sale, setSale] = useState(false);
    const [highRated, setHighRated] = useState(false);

    const [brandSearch, setBrandSearch] = useState("");
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

    const [priceRange, setPriceRange] = useState<number[]>([MIN_PRICE, MAX_PRICE]);

    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([]);

    useEffect(() => {
        const filters = {
            sale,
            highRated,
            selectedBrands,
            priceRange,
            selectedTypes,
            selectedColors,
            selectedManufacturers,
        };
        console.log("Выбранные фильтры:", filters);
    }, [sale, highRated, selectedBrands, priceRange, selectedTypes, selectedColors, selectedManufacturers]);

    return (
        <aside className={styles.sidebar}>
            <h2 className={styles.title}>Фильтры</h2>

            <FilterSaleAndRating
                sale={sale}
                onSaleChange={setSale}
                highRated={highRated}
                onHighRatedChange={setHighRated}
            />

            <FilterBrands
                brands={exampleBrands}
                brandSearch={brandSearch}
                onBrandSearchChange={setBrandSearch}
                selectedBrands={selectedBrands}
                onSelectedBrandsChange={setSelectedBrands}
            />

            <FilterPrice
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                min={MIN_PRICE}
                max={MAX_PRICE}
            />

            <FilterTypes
                types={exampleFilterTypes}
                selectedTypes={selectedTypes}
                onSelectedTypesChange={setSelectedTypes}
            />

            <FilterColors
                colors={exampleColors}
                selectedColors={selectedColors}
                onSelectedColorsChange={setSelectedColors}
            />

            <FilterManufacturers
                manufacturers={exampleManufacturers}
                selectedManufacturers={selectedManufacturers}
                onSelectedManufacturersChange={setSelectedManufacturers}
            />
        </aside>
    );
}
