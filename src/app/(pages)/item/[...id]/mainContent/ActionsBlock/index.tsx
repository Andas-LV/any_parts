"use client";

import { ItemInfoType } from "@/types/items/Item";
import { Icons } from "@/assets/svg/svg";
import styles from "./actionBlock.module.css";
import { Button } from "@components/ui/button";
import dynamic from "next/dynamic";
import { useCurrencySymbol } from "@/hooks/useCurrency";
import { useUserStore } from "@/entities/user/useUserStore";
import { exampleChartData } from "@/exampleData/exampleChartData";
import { useState } from "react";
import ChartModal from "@/widgets/modals/customer/chartModal/ChartModal";

const Chart = dynamic(() => import("@components/Chart"), { ssr: false });

interface IActionsBlock {
	item: ItemInfoType;
}

export default function ActionsBlock({ item }: IActionsBlock) {
	const { user } = useUserStore();
	const [chartModal, setChartModal] = useState(false);
	const { medianPrice, currentPrice } = exampleChartData;

	const currencySymbol = user ? useCurrencySymbol(user.currency) : "";
	const priceRange = medianPrice - currentPrice;
	const isNegative = priceRange < 0;

	return (
		<div className={styles.actionsBlockContainer}>
			<div className={styles.prices}>
				<div className={styles.leftSidePrice}>
					<div className={styles.actualPrice}>
						{(item?.currentPrice ?? item?.price).toLocaleString()}{" "}
						{currencySymbol}
					</div>
					{item?.currentPrice ? (
						<div className={styles.discountWrapper}>
							<div className={styles.oldPrice}>
								{item.price?.toLocaleString()} {currencySymbol}
							</div>
							<div className={styles.discount}>-{item.discount}%</div>
						</div>
					) : null}
				</div>

				<div className={styles.rightSidePrice}>
					<div className={styles.apPrice}>
						{item.apPrice} {currencySymbol}
					</div>
					<div className={styles.apText}>c AP Кошельком</div>
				</div>
			</div>

			<div onClick={() => setChartModal(true)} className={styles.chartWrapper}>
				<div
					className={`${styles.priceRange} ${isNegative ? styles.negative : ""}`}
				>
					{isNegative ? (
						<Icons.ArrowUp className={styles.arrowIcon} />
					) : (
						<Icons.ArrowDown className={styles.arrowIcon} />
					)}
					<p>
						{priceRange} {currencySymbol}
					</p>
					<Chart
						data={exampleChartData.values}
						color={isNegative ? "var(--error)" : "#009E60"}
					/>
				</div>
				<Icons.ArrowRight width={20} height={20} />
			</div>

			<div className={styles.actionButtons}>
				<Button className={styles.basket}>
					<Icons.Basket width={18} height={18} />В корзину
				</Button>
				<Button className={styles.buyNow}>Купить сейчас</Button>
			</div>

			<div className={styles.marketInfo}>
				<h3>
					<Icons.StoreFront width={14} height={14} />
					{item.marketName}
				</h3>
				<div className={styles.marketRating}>
					<Icons.Star width={12} height={12} />
					{item.rating}
					<Icons.ArrowDown width={12} height={12} />
				</div>
			</div>

			{chartModal && <ChartModal onClose={() => setChartModal(false)} />}
		</div>
	);
}
