"use client";

import styles from "./itemCard.module.css";
import { ItemCardType, TFilteredItemInfo } from "@/types/items/Item";
import { ImageCarousel } from "../ImageCarousel";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/assets/svg/svg";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ItemCardSkeleton from "@components/skeletons/ItemCardSkeleton/ItemCardSkeleton";
import { useCurrencySymbol } from "@/hooks/useCurrency";
import { useUserStore } from "@/entities/user/useUserStore";
import { routes } from "@/configs/routes";

interface ItemCardProps {
	item: ItemCardType | TFilteredItemInfo;
	showFavorite?: boolean;
}

export default function ItemCard({ item, showFavorite }: ItemCardProps) {
	if (!item) {
		return <ItemCardSkeleton />;
	}

	const { currencySymbol } = useUserStore();

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
	} = item;
	const router = useRouter();

	const [isFavorite, setIsFavorite] = useState(favorite);

	const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		setIsFavorite(!isFavorite);
	};

	return (
		<Card
			className={styles.card}
			onClick={() => router.push(routes.itemPage(id))}
		>
			<ImageCarousel images={images} alt={name} />

			<div className={styles.content}>
				<div className={styles.priceContainer}>
					<div className={styles.mainPrice}>
						{currentPrice?.toLocaleString() || price.toLocaleString()}{" "}
						{currencySymbol}
					</div>

					{discount && currentPrice && (
						<div className={styles.priceInfo}>
							<span className={styles.oldPrice}>
								{price.toLocaleString()}{" "}
								{currencySymbol}
							</span>
							<span className={styles.discount}>{discount}%</span>
						</div>
					)}
				</div>

				<h3 className={styles.title}>{name}</h3>

				<div className={styles.ratingWrapper}>
					<div className={styles.rating}>
						<Icons.Star width={12} height={12} />
						<span className={styles.ratingNumber}>{rating}</span>
					</div>
					<div className={styles.comments}>
						<Icons.Comments />
						{comments}
					</div>
				</div>

				<div className={styles.actions}>
					<Button className={styles.cartButton}>
						<Icons.Basket />В корзину
					</Button>

					{showFavorite && (
						<button
							onClick={(e) => toggleFavorite(e)}
							className={styles.favoriteButton}
						>
							{isFavorite ? (
								<Icons.HeartFilled className={styles.favoriteIcon} />
							) : (
								<Icons.HeartOutline className={styles.favoriteIcon} />
							)}
						</button>
					)}
				</div>
			</div>
		</Card>
	);
}
