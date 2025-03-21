"use client";

import React, { use, useEffect, useRef } from "react";
import styles from "./itemPage.module.css";
import HeaderWrapper from "@/layouts/HeaderProvider";
import ItemHeader from "./pageHeader/index";
import MainContent from "./mainContent";
import Details from "./details";
import RecommendedCarousel from "../../../../components/sliders/Recommended";
import PurchasedCarousel from "../../../../components/sliders/Purchased";
import { Comments } from "@/app/(pages)/item/[...id]/feedbacks";
import { useItemsStore } from "@/entities/items/useItemsStore";
import ItemStickyHeader from "@components/headers/ItemStickyHeader/ItemHeader";
import { useStickyHeader } from "@/hooks/useStickyHeader"; // Импортируем хук

export default function ItemPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id: idStr } = use(params);
	const id = Number(idStr);

	const { fetchItemById } = useItemsStore();

	useEffect(() => {
		fetchItemById(id);
	}, [id]);

	const showStickyHeader = useStickyHeader("mainContent");

	const detailsRef = useRef<HTMLDivElement>(null);

	const scrollToSection = () => {
		detailsRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	const breadcrumbItems = [
		{ label: "Главная", href: "/" },
		{ label: "Запчасти и аксессуары", href: "/transport/accessories" },
	];

	return (
		<div>
			<HeaderWrapper>
				{showStickyHeader && <ItemStickyHeader />}

				<div className={styles.wrapper}>
					<ItemHeader routes={breadcrumbItems} />
					<div id={"mainContent"}>
						<MainContent scrollToSection={scrollToSection} />
					</div>
					<RecommendedCarousel />
					<PurchasedCarousel />
					<div ref={detailsRef}>
						<Details />
					</div>
					<Comments />
				</div>
			</HeaderWrapper>
		</div>
	);
}
