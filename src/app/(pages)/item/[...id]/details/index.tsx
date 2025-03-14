"use client";

import React, { useState } from "react";
import styles from "./details.module.css";
import { charactersSerializer } from "@/types/items/charactersSerializer";
import { useItemsStore } from "@/entities/items/useItemsStore";
import DetailsSkeleton from "@components/skeletons/ItemPageSkeleton/DetailsSkeleton/DetailsSkeleton";

export default function Details() {
	const { currentItem } = useItemsStore();
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleExpand = () => setIsExpanded(!isExpanded);

	if (!currentItem) {
		return <DetailsSkeleton />;
	}

	const description = currentItem.description || "Нет описания";
	const characters = charactersSerializer(currentItem) || [];

	const hasCharacters = characters.length > 0;
	const MAX_LENGTH = 300;

	return (
		<div className={styles.details}>
			<div className={styles.description}>
				<h1>Описание</h1>
				<p>
					{isExpanded
						? description
						: description.slice(0, MAX_LENGTH) +
							(description.length > MAX_LENGTH ? "..." : "")}
				</p>
				{description.length > MAX_LENGTH && (
					<button className={styles.toggleButton} onClick={toggleExpand}>
						{isExpanded ? "Скрыть" : "Смотреть полностью"}
					</button>
				)}
			</div>

			<div className={styles.characteristicsWrapper}>
				<h1>Характеристики</h1>

				{hasCharacters ? (
					<div className={styles.characteristics}>
						{characters.map((characteristic, index) => (
							<div key={index} className={styles.characteristic}>
								<span className={styles.label}>{characteristic.name}</span>
								<span className={styles.dots}></span>
								<span className={styles.value}>{characteristic.value}</span>
							</div>
						))}
					</div>
				) : (
					<p>Нет характеристик</p>
				)}
			</div>
		</div>
	);
}
