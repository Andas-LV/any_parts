"use client";

import { useState } from "react";
import { Checkbox } from "@components/ui/checkbox";
import { Label } from "@components/ui/label";
import { Button } from "@components/ui/button";
import styles from "./filterSidebar.module.css";
import { ManufacturerOption } from "@/types/Filters";

interface FilterManufacturersProps {
    manufacturers: ManufacturerOption[];
    selectedManufacturers: string[];
    onSelectedManufacturersChange: (val: string[]) => void;
}

export function FilterManufacturers({
                                        manufacturers,
                                        selectedManufacturers,
                                        onSelectedManufacturersChange,
                                    }: FilterManufacturersProps) {
    const [showAll, setShowAll] = useState(false);

    const handleManufacturerChange = (manValue: string) => {
        if (selectedManufacturers.includes(manValue)) {
            onSelectedManufacturersChange(
                selectedManufacturers.filter((m) => m !== manValue)
            );
        } else {
            onSelectedManufacturersChange([...selectedManufacturers, manValue]);
        }
    };

    // Отображаем только первые 5 производителей, если showAll === false
    const manufacturersToShow = showAll
        ? manufacturers
        : manufacturers.slice(0, 5);

    return (
        <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Страна-изготовитель</h3>
            <div className={styles.checkboxesList}>
                {manufacturersToShow.map((man) => (
                    <div key={man.label} className={styles.checkboxItem}>
                        <Checkbox
                            id={man.label}
                            checked={selectedManufacturers.includes(man.label)}
                            className={styles.checkbox}
                            onCheckedChange={() => handleManufacturerChange(man.label)}
                        />
                        <Label htmlFor={man.label}>{man.label}</Label>
                    </div>
                ))}
            </div>

            {manufacturers.length > 5 && (
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
