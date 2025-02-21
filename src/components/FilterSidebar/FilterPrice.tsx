"use client";

import { Slider } from "@components/ui/slider";
import styles from "./filterSidebar.module.css";
import React from "react";

interface FilterPriceProps {
    priceRange: number[];
    onPriceRangeChange: (val: number[]) => void;
    min: number;
    max: number;
}

export function FilterPrice({priceRange, onPriceRangeChange, min, max}: FilterPriceProps) {
    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMin = Number(e.target.value);
        onPriceRangeChange([newMin, priceRange[1]]);
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMax = Number(e.target.value);
        onPriceRangeChange([priceRange[0], newMax]);
    };

    return (
        <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Цена</h3>
            <div className={styles.sliderContainer}>
                <Slider
                    defaultValue={[min, max]}
                    value={priceRange}
                    min={min}
                    max={max}
                    step={1000}
                    onValueChange={(val) => onPriceRangeChange(val)}
                />
            </div>

            <div className={styles.inputRow}>
                <input
                    type="number"
                    placeholder={`${min.toString()}₸`}
                    value={priceRange[0]}
                    onChange={handleMinChange}
                    className={styles.input}
                    maxLength={6}
                />
                <input
                    type="number"
                    placeholder={max.toString()}
                    value={priceRange[1]}
                    onChange={handleMaxChange}
                    className={styles.input}
                    maxLength={6}
                />
            </div>
        </div>
    );
}
