"use client";

import { useState } from "react";
import { Checkbox } from "@components/ui/checkbox";
import { Label } from "@components/ui/label";
import { Button } from "@components/ui/button";
import styles from "./filterSidebar.module.css";
import { ColorOption } from "@/types/Filters";

interface FilterColorsProps {
    colors: ColorOption[];
    selectedColors: string[];
    onSelectedColorsChange: (val: string[]) => void;
}

export function FilterColors({
                                 colors,
                                 selectedColors,
                                 onSelectedColorsChange,
                             }: FilterColorsProps) {
    const [showAll, setShowAll] = useState(false);

    const handleColorChange = (colorValue: string) => {
        if (selectedColors.includes(colorValue)) {
            onSelectedColorsChange(selectedColors.filter((c) => c !== colorValue));
        } else {
            onSelectedColorsChange([...selectedColors, colorValue]);
        }
    };

    const colorsToShow = showAll ? colors : colors.slice(0, 3);

    return (
        <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
                Цвет
            </h3>

            <div className={styles.checkboxesList}>
                {colorsToShow.map((color) => (
                    <div key={color.label} className={styles.checkboxItem}>
                        <Checkbox
                            id={color.label}
                            checked={selectedColors.includes(color.label)}
                            className={styles.checkbox}
                            onCheckedChange={() => handleColorChange(color.label)}
                        />
                        <Label htmlFor={color.label}>{color.label}</Label>
                    </div>
                ))}
            </div>

            {colors.length > 3 && (
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
