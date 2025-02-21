"use client";

import { useState } from "react";
import { Checkbox } from "@components/ui/checkbox";
import { Label } from "@components/ui/label";
import { Button } from "@components/ui/button";
import styles from "./filterSidebar.module.css";
import { TypeOption } from "@/types/Filters";

interface FilterTypesProps {
    types: TypeOption[];
    selectedTypes: string[];
    onSelectedTypesChange: (val: string[]) => void;
}

export function FilterTypes({
                                types,
                                selectedTypes,
                                onSelectedTypesChange,
                            }: FilterTypesProps) {
    const [showAll, setShowAll] = useState(false);

    const handleTypeChange = (typeValue: string) => {
        if (selectedTypes.includes(typeValue)) {
            onSelectedTypesChange(selectedTypes.filter((t) => t !== typeValue));
        } else {
            onSelectedTypesChange([...selectedTypes, typeValue]);
        }
    };

    // Отображаем только первые 5 типов, если showAll === false
    const typesToShow = showAll ? types : types.slice(0, 5);

    return (
        <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Тип</h3>
            <div className={styles.checkboxesList}>
                {typesToShow.map((type) => (
                    <div key={type.label} className={styles.checkboxItem}>
                        <Checkbox
                            id={type.label}
                            checked={selectedTypes.includes(type.label)}
                            className={styles.checkbox}
                            onCheckedChange={() => handleTypeChange(type.label)}
                        />
                        <Label htmlFor={type.label}>{type.label}</Label>
                    </div>
                ))}
            </div>

            {types.length > 5 && (
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
