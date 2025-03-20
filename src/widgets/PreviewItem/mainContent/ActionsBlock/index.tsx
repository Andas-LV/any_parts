"use client";

import styles from "./actionBlock.module.css";
import { useCurrencySymbol } from "@/hooks/useCurrency";
import { useUserStore } from "@/entities/user/useUserStore";
import { TCreateItemFullInfo } from "@/types/items/CreateItem";
import {
	calculateAPDiscount,
	calculateDiscount,
} from "@/utils/calculateDiscount";

interface IActionsBlock {
	item: TCreateItemFullInfo;
	selectedColorIndex: number;
	selectedSizeIndex: number;
}

export default function ActionsBlock({
	item,
	selectedColorIndex,
	selectedSizeIndex,
}: IActionsBlock) {
	const { user } = useUserStore();
	const currencySymbol = user ? useCurrencySymbol(user.currency) : "";

	const selectedColor = item.prices[selectedColorIndex];
	const selectedSize = selectedColor?.sizes[selectedSizeIndex];

	const price = selectedSize?.discountPrice ?? selectedSize?.price;
	const oldPrice = selectedSize?.price;

	return (
		<div className={styles.actionsBlockContainer}>
			<div className={styles.prices}>
				<div className={styles.leftSidePrice}>
					<div className={styles.actualPrice}>
						{price
							? `${price.toLocaleString()} ${currencySymbol}`
							: `${oldPrice?.toLocaleString()} ${currencySymbol}`}
					</div>
					{price && oldPrice !== price ? (
						<div className={styles.discountWrapper}>
							<div className={styles.oldPrice}>
								{oldPrice?.toLocaleString()} {currencySymbol}
							</div>
							<div className={styles.discount}>
								-{calculateDiscount(Number(oldPrice), Number(price))} %
							</div>
						</div>
					) : null}
				</div>

				<div className={styles.rightSidePrice}>
					<div className={styles.apPrice}>
						{price ? calculateAPDiscount(price) : calculateAPDiscount(oldPrice)}
						{currencySymbol}
					</div>
					<div className={styles.apText}>c AP Кошельком</div>
				</div>
			</div>
		</div>
	);
}
