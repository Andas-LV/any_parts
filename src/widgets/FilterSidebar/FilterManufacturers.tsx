"use client";

import { useState } from "react";
import { Checkbox } from "@components/ui/checkbox";
import { Label } from "@components/ui/label";
import { Button } from "@components/ui/button";
import styles from "./filterSidebar.module.css";
import { ManufacturerOption } from "@/types/Filters";
import { useFiltersStore } from "@/entities/items/useFiltersStore";
import { exampleManufacturers } from "@/exampleData/exampleFilters";

export function FilterManufacturers() {
	const { selectedManufacturers, setSelectedManufacturers } = useFiltersStore();
	const [showAll, setShowAll] = useState(false);

	const handleManufacturerChange = (manValue: string) => {
		if (selectedManufacturers.includes(manValue)) {
			setSelectedManufacturers(
				selectedManufacturers.filter((m) => m !== manValue),
			);
		} else {
			setSelectedManufacturers([...selectedManufacturers, manValue]);
		}
	};

	const manufacturersToShow = showAll
		? exampleManufacturers
		: exampleManufacturers.slice(0, 5);

	return (
		<div className={styles.section}>
			<h3 className={styles.sectionTitle}>Страна-изготовитель</h3>
			<div className={styles.checkboxesList}>
				{manufacturersToShow.map((man: ManufacturerOption) => (
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
			{exampleManufacturers.length > 5 && (
				<Button
					variant="link"
					className={styles.showAllBtn}
					onClick={() => setShowAll((prev) => !prev)}
				>
					{showAll ? "Свернуть" : "Показать всё"}
				</Button>
			)}
		</div>
	);
}
