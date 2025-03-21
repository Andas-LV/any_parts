"use client";

import { useState } from "react";
import styles from "./headerFilter.module.css";
import Image from "next/image";
import { filterTypes } from "./filterTypes";

export default function HeaderFilter() {
	const [activeFilter, setActiveFilter] = useState<string | null>(null);

	return (
		<div className={styles.container}>
			<span className={styles.title}>Запчасти для:</span>
			{filterTypes.map((filter) => (
				<div
					key={filter.name}
					className={styles.item}
					onClick={() => setActiveFilter(filter.name)}
				>
					<Image src={filter.image} alt={filter.name} width={20} height={20} />
					<span>{filter.name}</span>
				</div>
			))}
		</div>
	);
}
