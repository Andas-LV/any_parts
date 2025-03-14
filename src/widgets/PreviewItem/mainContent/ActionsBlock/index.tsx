"use client";

import styles from "./actionBlock.module.css";
import { useCurrencySymbol } from "@/hooks/useCurrency";
import { useUserStore } from "@/entities/user/useUserStore";
import { TCreateItemFullInfo } from "@/types/items/CreateItem";
import { calculateDiscountPercentage } from "@/hooks/calculateDiscountPercentage";

interface IActionsBlock {
	item: TCreateItemFullInfo;
}

export default function ActionsBlock({ item }: IActionsBlock) {
	const { user } = useUserStore();

	const currencySymbol = user ? useCurrencySymbol(user.currency) : "";

	console.log("fullInfo", item);

	return (
		<div className={styles.actionsBlockContainer}>
			<div className={styles.prices}>
				<div className={styles.leftSidePrice}>
					<div className={styles.actualPrice}>
						{item.prices[0].sizes[0].discountPrice
							? `${item.prices[0].sizes[0].discountPrice.toLocaleString()} ${currencySymbol}`
							: `${item.prices[0].sizes[0].price.toLocaleString()} ${currencySymbol}`}
					</div>
					{item.prices[0].sizes[0].discountPrice ? (
						<div className={styles.discountWrapper}>
							<div className={styles.oldPrice}>
								{item.prices[0].sizes[0].price.toLocaleString()}{" "}
								{currencySymbol}
							</div>
							<div className={styles.discount}>
								-
								{calculateDiscountPercentage(
									Number(item.prices[0].sizes[0].price),
									Number(item.prices[0].sizes[0].discountPrice),
								)}
								%
							</div>
						</div>
					) : null}
				</div>

				<div className={styles.rightSidePrice}>
					<div className={styles.apPrice}>
						{item.prices[0].sizes[0].price} {currencySymbol}
					</div>
					<div className={styles.apText}>c AP Кошельком</div>
				</div>
			</div>
		</div>
	);
}
