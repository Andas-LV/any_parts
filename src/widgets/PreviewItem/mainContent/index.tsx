"use client";

import React, { useEffect, useState } from "react";
import ImageCarousel from "./ImageCarousel";
import ItemInfo from "./ItemInfo";
import styles from "./mainContent.module.css";
import ActionsBlock from "./ActionsBlock";
import Loading from "@components/Loading";
import { useCreateItemStore } from "@/entities/partners/createItem/useCreateItemStore";
import ImagesSkeleton from "@components/skeletons/ItemPageSkeleton/ImagesSkeleton/ImagesSkeleton";
import MainInfoSkeleton from "@components/skeletons/ItemPageSkeleton/MainInfoSkeleton/MainInfoSkeleton";
import ActionsBlockSkeleton from "@components/skeletons/ItemPageSkeleton/ActionBlockSkeleton/ActionBlockSkeleton";

export default function MainContent() {
	const { fullInfo, isLoading } = useCreateItemStore();
	const [selectedIndex, setSelectedIndex] = useState(0);

	if (!fullInfo || isLoading) {
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
				images={fullInfo.images}
				selectedIndex={selectedIndex}
				setSelectedIndexAction={setSelectedIndex}
			/>
			<ItemInfo
				item={fullInfo}
				selectedIndex={selectedIndex}
				setSelectedIndexAction={setSelectedIndex}
			/>
			<ActionsBlock item={fullInfo} />
		</div>
	);
}
