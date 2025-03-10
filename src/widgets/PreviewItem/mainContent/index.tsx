"use client";

import React, { useEffect, useState } from "react";
import ImageCarousel from "./ImageCarousel";
import ItemInfo from "./ItemInfo";
import styles from "./mainContent.module.css";
import ActionsBlock from "./ActionsBlock";
import Loading from "@components/Loading";
import { useCreateItemStore } from "@/entities/items/useCreateItemStore";

export default function MainContent() {
	const { fullInfo } = useCreateItemStore();
	const [selectedIndex, setSelectedIndex] = useState(0);

	if (!fullInfo) {
		return <Loading />;
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
