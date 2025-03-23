"use client";

import React, { useState } from "react";
import { ItemInfoType } from "@/types/items/Item";
import RatingStars from "@components/stars/RatingStars";
import { cn } from "@/lib/utils";
import { Icons } from "@/assets/svg";
import { copyToClipboard } from "@components/copyToClipboard";
import { useToast } from "@/hooks/use-toast";
import { charactersSerializer } from "@/types/items/charactersSerializer";
import { Button } from "@components/ui/button";
import styles from "./itemInfo.module.css";
import { renderThumbnail } from "@/utils/renderThumbnail";

interface ItemInfoProps {
	selectedIndex: number;
	setSelectedIndexAction: (index: number) => void;
	item: ItemInfoType;
	scrollToSection: () => void;
}

export default function ItemInfo({
	selectedIndex,
	setSelectedIndexAction,
	item,
	scrollToSection,
}: ItemInfoProps) {
	const { toast } = useToast();
	const characters = charactersSerializer(item);
	const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);

	return (
		<div className={styles.itemInfoContainer}>
			<h1>{item.name}</h1>

			<div className={styles.ratings}>
				<div className={styles.rating}>
					{item.rating} <RatingStars rating={item.rating} />
				</div>
				<div className={styles.comments}>{item.comments.amount} отзывов</div>
				<div className={styles.sold}>{item.sold} продано</div>
			</div>

			{/* Кнопки для прокрутки */}
			<div className={styles.linkBtns}>
				<button onClick={scrollToSection}>Характеристики</button>
				<button onClick={scrollToSection}>Описание</button>
			</div>

			<div className={styles.imagesOption}>
				{item.images.map((src, i) => (
					<button
						key={i}
						className={cn(styles.thumbnail, {
							[styles.activeImage]: i === selectedIndex,
						})}
						onClick={() => setSelectedIndexAction(i)}
					>
						{renderThumbnail(src, i)}
					</button>
				))}
			</div>

			<div className={styles.options}>
				{item.options.map((option, i) => (
					<Button
						key={i}
						variant={i === selectedOptionIndex ? "default" : "ghost"}
						onClick={() => setSelectedOptionIndex(i)}
						className={cn(styles.optionBtn, {
							[styles.activeOption]: i === selectedOptionIndex,
						})}
					>
						{option}
					</Button>
				))}
			</div>

			{/* Раздел с характеристиками */}
			<div className={styles.characteristics}>
				{characters.map((character, i) => (
					<div key={i} className={styles.characteristic}>
						<span className={styles.label}>{character.name}</span>
						<span className={styles.dots} />
						<span className={styles.value}>
							{character.value}
							{character.name === "Артикул" && (
								<button
									className={styles.copyIcon}
									onClick={() => copyToClipboard(character.value, toast)}
								>
									<Icons.Copy />
								</button>
							)}
						</span>
					</div>
				))}
			</div>

			<Button onClick={scrollToSection} variant="link" className={styles.fullCharsLink}>
				Все характеристики
			</Button>
		</div>
	);
}
