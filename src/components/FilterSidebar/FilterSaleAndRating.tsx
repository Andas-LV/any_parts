"use client";

import { Checkbox } from "@components/ui/checkbox";
import { Label } from "@components/ui/label";
import RatingStars from "@components/stars/RatingStars";
import styles from "./filterSidebar.module.css";

interface FilterSaleAndRatingProps {
    sale: boolean;
    onSaleChange: (val: boolean) => void;
    highRated: boolean;
    onHighRatedChange: (val: boolean) => void;
}

export function FilterSaleAndRating({
                                        sale,
                                        onSaleChange,
                                        highRated,
                                        onHighRatedChange,
                                    }: FilterSaleAndRatingProps) {
    return (
        <div className={styles.section}>
            <div className={styles.checkboxesList}>
                <div className={styles.checkboxItem}>
                    <Checkbox
                        id="sale"
                        checked={sale}
                        className={styles.checkbox}
                        onCheckedChange={(checked) => onSaleChange(Boolean(checked))}
                    />
                    <Label htmlFor="sale">Распродажа</Label>
                </div>
                <div className={styles.checkboxItem}>
                    <Checkbox
                        id="highRated"
                        checked={highRated}
                        className={styles.checkbox}
                        onCheckedChange={(checked) => onHighRatedChange(Boolean(checked))}
                    />
                    <Label htmlFor="highRated" className={styles.checkboxLabel}>
                        <RatingStars rating={4.5}/> или более
                    </Label>
                </div>
            </div>
        </div>
    );
}
