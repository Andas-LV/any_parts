"use client";

import React, { useState } from "react";
import ImageCarousel from "@components/ImageCarousel";
import ItemInfo from "./ItemInfo";
import styles from "./mainContent.module.css";
import ActionsBlock from "./ActionsBlock";
import { useCreateItemStore } from "@/entities/partners/createItem/useCreateItemStore";
import ImagesSkeleton from "@components/skeletons/ItemPageSkeleton/ImagesSkeleton/ImagesSkeleton";
import MainInfoSkeleton from "@components/skeletons/ItemPageSkeleton/MainInfoSkeleton/MainInfoSkeleton";
import ActionsBlockSkeleton from "@components/skeletons/ItemPageSkeleton/ActionBlockSkeleton/ActionBlockSkeleton";

export default function MainContent() {
	const { fullInfo, isLoading } = useCreateItemStore();
	const [selectedColorIndex, setSelectedColorIndex] = useState(0);
	const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);

	if (!fullInfo || isLoading) {
		return (
			<div className={styles.noContentWrapper}>
				<ImagesSkeleton />
				<MainInfoSkeleton />
				<ActionsBlockSkeleton />
			</div>
		);
	}

	const images = [
		...fullInfo.images,
		...fullInfo.colors.map((color) => color.photo),
	];

	return (
		<div className={styles.mainContent}>
			<ImageCarousel
				images={images}
				selectedIndex={selectedSizeIndex}
				setSelectedIndexAction={setSelectedSizeIndex}
			/>
			<ItemInfo
				item={fullInfo}
				selectedColorIndex={selectedColorIndex}
				setSelectedColorIndex={setSelectedColorIndex}
				selectedSizeIndex={selectedSizeIndex}
				setSelectedSizeIndex={setSelectedSizeIndex}
			/>
			<ActionsBlock
				item={fullInfo}
				selectedColorIndex={selectedColorIndex}
				selectedSizeIndex={selectedSizeIndex}
			/>
		</div>
	);
}
