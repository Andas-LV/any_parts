"use client";

import React, { use, useState, useEffect } from "react";
import styles from "./itemPage.module.css";
import HeaderWrapper from "@/layouts/HeaderProvider";
import ItemHeader from "./pageHeader/index";
import MainContent from "./mainContent";
import Details from "./details";
import RecommendedCarousel from "@/widgets/Items/(Carousel)/Recommended";
import PurchasedCarousel from "@/widgets/Items/(Carousel)/Purchased";
import { Comments } from "@/app/(pages)/item/[...id]/feedbacks";
import { useItemsStore } from "@/entities/items/useItemsStore";
import Loading from "@components/Loading";
import ItemStickyHeader from "@/app/(pages)/item/[...id]/ItemStickyHeader/ItemHeader";

export default function ItemPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id: idStr } = use(params);
	const id = Number(idStr);

	const { fetchItemById, currentItem } = useItemsStore();

	useEffect(() => {
		fetchItemById(id);
	}, [id]);

	const [showStickyHeader, setShowStickyHeader] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setShowStickyHeader(window.scrollY > window.innerHeight);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const breadcrumbItems = [
		{ label: "Главная", href: "/" },
		{ label: "Запчасти и аксессуары", href: "/transport/accessories" },
	];

	if (!currentItem) {
		return <Loading />;
	}

	return (
		<div>
			<HeaderWrapper>
				{showStickyHeader && <ItemStickyHeader />}

				<div className={styles.wrapper}>
					<ItemHeader routes={breadcrumbItems} />
					<MainContent />
					<RecommendedCarousel />
					<PurchasedCarousel />
					<Details />
					<Comments />
				</div>
			</HeaderWrapper>
		</div>
	);
}
