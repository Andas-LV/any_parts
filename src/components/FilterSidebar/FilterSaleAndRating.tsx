"use client";

import { Checkbox } from "@components/ui/checkbox";
import { Label } from "@components/ui/label";
import RatingStars from "@components/stars/RatingStars";
import styles from "./filterSidebar.module.css";
import { useFiltersStore } from "@/entities/items/useFiltersStore";

export function FilterSaleAndRating() {
    const { sale, highRated, setSale, setHighRated } = useFiltersStore();

    return (
        <div className={styles.section}>
            <div className={styles.checkboxesList}>
                <div className={styles.checkboxItem}>
                    <Checkbox
                        id="sale"
                        checked={sale}
                        className={styles.checkbox}
                        onCheckedChange={(checked) => setSale(Boolean(checked))}
                    />
                    <Label htmlFor="sale">Распродажа</Label>
                </div>
                <div className={styles.checkboxItem}>
                    <Checkbox
                        id="highRated"
                        checked={highRated}
                        className={styles.checkbox}
                        onCheckedChange={(checked) => setHighRated(Boolean(checked))}
                    />
                    <Label htmlFor="highRated" className={styles.checkboxLabel}>
                        <RatingStars rating={4.5} /> или более
                    </Label>
                </div>
            </div>
        </div>
    );
}
