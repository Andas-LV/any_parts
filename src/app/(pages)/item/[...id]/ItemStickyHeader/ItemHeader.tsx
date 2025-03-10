import React, { FC, useState } from "react";
import styles from "./ItemHeader.module.css";
import { useItemsStore } from "@/entities/items/useItemsStore";
import { Button } from "@components/ui/button";
import { Icons } from "@/assets/svg";
import { useUserStore } from "@/entities/user/useUserStore";
import { useCurrencySymbol } from "@/utils/useCurrency";

interface ItemHeaderProps {}

const ItemStickyHeader: FC<ItemHeaderProps> = () => {
	const { currentItem } = useItemsStore();
	const { user } = useUserStore();
	const [isFavorite, setIsFavorite] = useState(currentItem?.favorite);

	const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		setIsFavorite(!isFavorite);
	};

	const rating = currentItem?.rating || 0;

	return (
		<div className={styles.ItemHeader}>
			<div className={styles.itemInfoWrapper}>
				<div className={styles.itemInfo}>
					{currentItem?.images && (
						<img
							src={currentItem.images[0]}
							alt={currentItem.name}
							className={styles.image}
						/>
					)}

					<div className={styles.infoTexts}>
						<span className={styles.itemTitle}>
							{currentItem?.marketName} / {currentItem?.name}
						</span>

						<div className={styles.ratingBlock}>
							<div className={styles.rating}>
								<Icons.Star width={14} height={14} />
								<span className={styles.ratingValue}>{rating.toFixed(1)}</span>
							</div>

							<div className={styles.nav}>
								{currentItem?.comments.amount} отзывов
							</div>

							<div className={styles.nav}>Характеристики</div>

							<div className={styles.nav}>Описание</div>
						</div>
					</div>
				</div>

				<div className={styles.prices}>
					<div className={styles.leftSidePrice}>
						<div className={styles.actualPrice}>
							{currentItem?.currentPrice
								? currentItem.currentPrice.toLocaleString()
								: currentItem?.price.toLocaleString()}{" "}
							{user && useCurrencySymbol(user.currency)}
						</div>
						{currentItem?.currentPrice ? (
							<div className={styles.discountWrapper}>
								<div className={styles.oldPrice}>
									{currentItem.price.toLocaleString()}
									{user && useCurrencySymbol(user.currency)}
								</div>
								<div className={styles.discount}>-{currentItem.discount}%</div>
							</div>
						) : null}
					</div>

					<div className={styles.rightSidePrice}>
						<div className={styles.apPrice}>
							{currentItem?.apPrice}
							{user && useCurrencySymbol(user.currency)}
						</div>

						<div className={styles.apText}>c AP Кошельком</div>
					</div>
				</div>
			</div>

			<div className={styles.actionButtons}>
				<Button className={styles.basket}>
					<Icons.Basket width={18} height={18} />В корзину
				</Button>

				<Button className={styles.buyNow}>Купить сейчас</Button>

				<button onClick={toggleFavorite} className={styles.favoriteButton}>
					{isFavorite ? (
						<Icons.HeartFilled className={styles.favoriteIcon} />
					) : (
						<Icons.HeartOutline className={styles.favoriteIcon} />
					)}
				</button>
			</div>
		</div>
	);
};

export default ItemStickyHeader;
