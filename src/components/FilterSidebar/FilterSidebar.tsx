"use client";

import { useEffect } from "react";
import styles from "./filterSidebar.module.css";

import { FilterSaleAndRating } from "./FilterSaleAndRating";
import { FilterBrands } from "./FilterBrands";
import { FilterPrice } from "./FilterPrice";
import { FilterTypes } from "./FilterTypes";
import { FilterColors } from "./FilterColors";
import { FilterManufacturers } from "./FilterManufacturers";
import { useFiltersStore } from "@/entities/items/useFiltersStore";

export default function FilterSidebar() {
    const {
        sale,
        highRated,
        selectedBrands,
        priceRange,
        selectedTypes,
        selectedColors,
        selectedManufacturers,
    } = useFiltersStore();

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

            <FilterSaleAndRating/>

            <FilterBrands/>

            <FilterPrice/>

            <FilterTypes/>

            <FilterColors/>

            <FilterManufacturers/>
        </aside>
    );
}
