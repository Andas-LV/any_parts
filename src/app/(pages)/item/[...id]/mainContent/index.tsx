"use client";

import React, { useState } from "react";
import ImageCarousel from "@/app/(pages)/item/[...id]/mainContent/ImageCarousel";
import ItemInfo from "@/app/(pages)/item/[...id]/mainContent/ItemInfo";
import styles from "./mainContent.module.css";
import ActionsBlock from "@/app/(pages)/item/[...id]/mainContent/ActionsBlock";
import { useItemsStore } from "@/entities/items/useItemsStore";
import ImagesSkeleton from "@components/skeletons/ItemPageSkeleton/ImagesSkeleton/ImagesSkeleton";
import MainInfoSkeleton from "@components/skeletons/ItemPageSkeleton/MainInfoSkeleton/MainInfoSkeleton";
import ActionsBlockSkeleton from "@components/skeletons/ItemPageSkeleton/ActionBlockSkeleton/ActionBlockSkeleton";

export default function MainContent() {
	const [selectedIndex, setSelectedIndex] = useState(0);

	const { currentItem, isLoading } = useItemsStore();

	if (!currentItem || isLoading) {
		return (
			<div className={styles.noContentWrapper}>
				<ImagesSkeleton />
				<MainInfoSkeleton />
				<ActionsBlockSkeleton />
			</div>
		);
	}

	return (
		<div className={styles.mainContent}>
			<ImageCarousel
				images={currentItem?.images}
				selectedIndex={selectedIndex}
				setSelectedIndexAction={setSelectedIndex}
			/>
			<ItemInfo
				item={currentItem}
				selectedIndex={selectedIndex}
				setSelectedIndexAction={setSelectedIndex}
			/>
			<ActionsBlock item={currentItem} />
		</div>
	);
}
