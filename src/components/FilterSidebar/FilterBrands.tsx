"use client";

import { useState } from "react";
import { Checkbox } from "@components/ui/checkbox";
import { Label } from "@components/ui/label";
import { Button } from "@components/ui/button";
import styles from "./filterSidebar.module.css";
import { Search as SearchIcon } from "lucide-react";
import { Brand } from "@/types/Filters";

interface FilterBrandsProps {
    brands: Brand[];
    brandSearch: string;
    onBrandSearchChange: (val: string) => void;
    selectedBrands: string[];
    onSelectedBrandsChange: (brands: string[]) => void;
}

export function FilterBrands({
                                 brands,
                                 brandSearch,
                                 onBrandSearchChange,
                                 selectedBrands,
                                 onSelectedBrandsChange,
                             }: FilterBrandsProps) {
    const [showAll, setShowAll] = useState(false);

    const filteredBrands = brands.filter((brand) =>
        brand.label.toLowerCase().includes(brandSearch.toLowerCase())
    );

    const handleBrandChange = (brandValue: string) => {
        if (selectedBrands.includes(brandValue)) {
            onSelectedBrandsChange(selectedBrands.filter((b) => b !== brandValue));
        } else {
            onSelectedBrandsChange([...selectedBrands, brandValue]);
        }
    };

    // Показываем только 5 брендов, если showAll === false
    const brandsToShow = showAll ? filteredBrands : filteredBrands.slice(0, 5);

    return (
        <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Бренды</h3>

            <div className={styles.searchWrapper}>
                <SearchIcon className={styles.searchIcon} />
                <input
                    value={brandSearch}
                    onChange={(e) => onBrandSearchChange(e.target.value)}
                    type="text"
                    placeholder="Поиск..."
                    className={styles.searchInput}
                />
            </div>

            <div className={styles.checkboxesList}>
                {brandsToShow.map((brand) => (
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

            {/* Если брендов больше, чем отображается, показываем кнопку */}
            {filteredBrands.length > 5 && (
                <Button
                    variant={"link"}
                    className={styles.showAllBtn}
                    onClick={() => setShowAll((prev) => !prev)}
                >
                    {showAll ? "Свернуть" : "Показать всё"}
                </Button>
            )}
        </div>
    );
}
