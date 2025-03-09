"use client";

import { useState } from "react";
import { Checkbox } from "@components/ui/checkbox";
import { Label } from "@components/ui/label";
import { Button } from "@components/ui/button";
import styles from "./filterSidebar.module.css";
import { TypeOption } from "@/types/Filters";
import { useFiltersStore } from "@/entities/items/useFiltersStore";
import { exampleFilterTypes } from "@/exampleData/exampleFilters";

export function FilterTypes() {
	const { selectedTypes, setSelectedTypes } = useFiltersStore();
	const [showAll, setShowAll] = useState(false);

	const handleTypeChange = (typeValue: string) => {
		if (selectedTypes.includes(typeValue)) {
			setSelectedTypes(selectedTypes.filter((t) => t !== typeValue));
		} else {
			setSelectedTypes([...selectedTypes, typeValue]);
		}
	};

	const typesToShow = showAll
		? exampleFilterTypes
		: exampleFilterTypes.slice(0, 5);

	return (
		<div className={styles.section}>
			<h3 className={styles.sectionTitle}>Тип</h3>
			<div className={styles.checkboxesList}>
				{typesToShow.map((type: TypeOption) => (
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
			{exampleFilterTypes.length > 5 && (
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
