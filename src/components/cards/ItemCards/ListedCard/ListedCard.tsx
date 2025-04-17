"use client";

import styles from "./listedCard.module.css";
import { TFilteredItemInfo } from "@/types/items/Item";
import { ImageCarousel } from "../ImageCarousel";
import { Card } from "@components/ui/card";
import { Button } from "@components/ui/button";
import { Icons } from "@/assets/svg/svg";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Loading from "@components/Loading";
import RatingStars from "@components/stars/RatingStars";
import ListedCardSkeleton from "@components/skeletons/ListedCardSkeleton/ListedCardSkeleton";
import { useCurrencySymbol } from "@/hooks/useCurrency";
import { useUserStore } from "@/entities/user/useUserStore";
import { routes } from "@/configs/routes";

interface ItemCardProps {
	item: TFilteredItemInfo;
	showFavorite?: boolean;
}

export default function ListedCard({ item, showFavorite }: ItemCardProps) {
	const router = useRouter();

	if (!item) {
		return <ListedCardSkeleton />;
	}

	const {
		id,
		name,
		price,
		currentPrice,
		discount,
		rating,
		comments,
		images,
		favorite,
		material,
		itemType,
		brand,
		color,
		apPrice,
		marketName,
	} = item;

	const { currencySymbol } = useUserStore();

	const characters = [
		{ name: "Тип", value: itemType },
		{ name: "Цвет", value: color },
		{ name: "Брэнд", value: brand },
		{ name: "Материал", value: material },
	].filter((c) => c.value);

	const [isFavorite, setIsFavorite] = useState(favorite);

	const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		setIsFavorite((prev) => !prev);
		// Здесь можно добавить логику запроса на сервер
	};

	return (
		<Card
			className={styles.card}
			onClick={() => router.push(routes.itemPage(id))}
		>
			<div className={styles.imageContainer}>
				<ImageCarousel images={images} alt={name} width={200} />
			</div>

			<div className={styles.mainInfo}>
				<div className={styles.titleHeader}>
					{name}

					{showFavorite && (
						<button onClick={toggleFavorite} className={styles.favoriteButton}>
							{isFavorite ? (
								<Icons.HeartFilled className={styles.favoriteIcon} />
							) : (
								<Icons.HeartOutline className={styles.favoriteIcon} />
							)}
						</button>
					)}
				</div>

				{/* Цены */}
				<div className={styles.priceContainer}>
					<div className={styles.mainPrice}>
						{currentPrice?.toLocaleString() || price.toLocaleString()}
						{currencySymbol}
					</div>

					{discount && currentPrice && (
						<div className={styles.priceInfo}>
							<span className={styles.oldPrice}>
								{price.toLocaleString()}
								{currencySymbol}
							</span>

							<span className={styles.discount}>-{discount}%</span>
						</div>
					)}

					{apPrice && (
						<div className={styles.apPrice}>
							<span>{apPrice}</span> c AP Кошельком
						</div>
					)}
				</div>

				{characters.length > 0 ? (
					<div className={styles.characteristics}>
						{characters.map((char, index) => (
							<div key={index} className={styles.characteristic}>
								<span className={styles.label}>{char.name}</span>
								<span className={styles.dots}></span>
								<span className={styles.value}>{char.value}</span>
							</div>
						))}

						<Button variant="link" className={styles.allDetails}>
							Все характеристики
						</Button>
					</div>
				) : (
					<p>Нет характеристик</p>
				)}
			</div>

			<div className={styles.rightSideContent}>
				<p>{marketName}</p>

				<div className={styles.stats}>
					<span className={styles.ratingValue}>{rating}</span>
					<RatingStars rating={rating} />
					<div className={styles.commentsValue}>{comments} отзывов</div>
				</div>

				<Button className={styles.cartButton}>
					<Icons.Basket />В корзину
				</Button>
			</div>
		</Card>
	);
}
