// "use client"

import React from "react";
import styles from "./ChartModal.module.css";
import ModalsLayout from "@/layouts/modalLayout/layout";
import dynamic from "next/dynamic";
import { Button } from "@components/ui/button";
import { exampleChartData } from "@/exampleData/exampleChartData";
import { useCurrencySymbol } from "@/utils/useCurrency";
import { useUserStore } from "@/entities/user/useUserStore";

const Chart = dynamic(() => import("@components/Chart"), { ssr: false });

interface ChartModalProps {
	onClose: () => void;
}

export default function ChartModal({ onClose }: ChartModalProps) {
	const { user } = useUserStore();
	const { medianPrice, currentPrice, values } = exampleChartData;

	const currencySymbol = user ? useCurrencySymbol(user.currency) : "";
	const minValue = Math.min(...values.map((item) => item.value));
	const maxValue = Math.max(...values.map((item) => item.value));

	const startDate = values[0].date;
	const endDate = values[values.length - 1].date;

	return (
		<ModalsLayout title={`${currentPrice} ${currencySymbol}`} onClose={onClose}>
			<div className={styles.chartContainer}>
				<div className={styles.priceRange}>
					Диапазон: {minValue} ₸ – {maxValue} ₸
				</div>

				<div className={styles.chartWrapper}>
					<Chart
						data={values}
						color={"var(--brand-primary)"}
						height={100}
						dot={true}
						tooltip={true}
					/>
				</div>

				<div className={styles.dates}>
					<span>{startDate}</span>
					<span>{endDate}</span>
				</div>

				<p className={styles.subtext}>
					Показываем цены без учёта скидок и при оплате AP Кошельком
				</p>

				<Button className={styles.closeButton} onClick={onClose}>
					Закрыть
				</Button>
			</div>
		</ModalsLayout>
	);
}
