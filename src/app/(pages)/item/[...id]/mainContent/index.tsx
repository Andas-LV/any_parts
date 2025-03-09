"use client";

import React, { useState } from "react";
import ImageCarousel from "@/app/(pages)/item/[...id]/mainContent/ImageCarousel";
import ItemInfo from "@/app/(pages)/item/[...id]/mainContent/ItemInfo";
import styles from "./mainContent.module.css";
import ActionsBlock from "@/app/(pages)/item/[...id]/mainContent/ActionsBlock";
import { useItemsStore } from "@/entities/items/useItemsStore";
import Loading from "@components/Loading";

export default function MainContent() {
	const [selectedIndex, setSelectedIndex] = useState(0);

	const { currentItem } = useItemsStore();

	if (!currentItem) {
		return <Loading />;
	}

	return (
		<div className={styles.mainContent}>
			<ImageCarousel
				images={currentItem.images}
				selectedIndex={selectedIndex}
				setSelectedIndexAction={setSelectedIndex}
			/>
			<ItemInfo
				{...currentItem}
				selectedIndex={selectedIndex}
				setSelectedIndexAction={setSelectedIndex}
			/>
			<ActionsBlock {...currentItem} />
		</div>
	);
}
