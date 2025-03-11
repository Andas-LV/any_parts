"use client";

import React, { useState } from "react";
import styles from "./details.module.css";
import { charactersSerializer } from "@/types/charactersSerializer";
import { useCreateItemStore } from "@/entities/items/useCreateItemStore";
import DetailsSkeleton from "@components/skeletons/ItemPageSkeleton/DetailsSkeleton/DetailsSkeleton";

export default function Details() {
	const { fullInfo } = useCreateItemStore();
	const [isExpanded, setIsExpanded] = useState(false); // Перемещаем useState наверх

	if (!fullInfo) {
		return <DetailsSkeleton />;
	}

	const description = fullInfo.description || "Нет описания";
	const characters = charactersSerializer(fullInfo) || [];
	const hasCharacters = characters.length > 0;
	const MAX_LENGTH = 300;
	const toggleExpand = () => setIsExpanded(!isExpanded);

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
