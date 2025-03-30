import React, { useState } from "react";
import styles from "./SellsStatistics.module.css";
import { Icons } from "@/assets/svg/svg";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@components/ui/dropdown-menu";
import { dateOptions, sellsSorting } from "@/constants/markets";
import { isProgressed, renderProgressIcon } from "@/utils/statsProgress";
import Chart from "@components/Chart";
import { exampleChartData } from "@/exampleData/exampleChartData";

export default function SellsStatistics() {
	const { values } = exampleChartData;

	const [isSortsOpen, setIsSortsOpen] = useState(false);
	const [isDateOptions, setIsDateOptions] = useState(false);

	const viewsAmount = 3700;
	const salesAmount = 1200;
	const viewProgress = 34;
	const salesProgress = -13;

	return (
		<div className={styles.SellsStatistics}>
			<div className={styles.leftBlocks}>
				<div className={styles.visits}>
					<div className={styles.statAmountWrapper}>
						<div className={styles.storeFrontIconWrapper}>
							<Icons.Users width={30} height={30} />
						</div>
						{viewsAmount}
					</div>
					<h3>Кол-во покупателей</h3>

					<div className={styles.progressWrapper}>
						{renderProgressIcon(viewProgress)}
						<span
							className={`${isProgressed(viewProgress) ? styles.trendUp : styles.trendDown}`}
						>
							{viewProgress}%
						</span>
						<p>за последнюю неделю</p>
					</div>
				</div>
				<div className={styles.sales}>
					<div className={styles.statAmountWrapper}>
						<div className={styles.basketIconWrapper}>
							<Icons.Basket width={30} height={30} fill={"black"} />
						</div>
						{salesAmount}
					</div>
					<h3>Общая выручка</h3>
					<div className={styles.progressWrapper}>
						{renderProgressIcon(salesProgress)}
						<span
							className={`${isProgressed(salesProgress) ? styles.trendUp : styles.trendDown}`}
						>
							{salesProgress}%
						</span>
						<p>за последнюю неделю</p>
					</div>
				</div>
			</div>

			<div className={styles.chartWrapper}>
				<div className={styles.chartHeader}>
					<h1>Статистика магазинов</h1>

					<div className={styles.filters}>
						<DropdownMenu onOpenChange={setIsSortsOpen}>
							<DropdownMenuTrigger className={styles.select}>
								{sellsSorting[0]}
								<Icons.ArrowDown
									className={`${styles.arrowIcon} ${
										isSortsOpen ? styles.rotated : ""
									}`}
								/>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								{sellsSorting.map((sort, i) => (
									<DropdownMenuItem key={i}>{sort}</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>

						<DropdownMenu onOpenChange={setIsDateOptions}>
							<DropdownMenuTrigger className={styles.select}>
								{dateOptions[0]}
								<Icons.ArrowDown
									className={`${styles.arrowIcon} ${
										isDateOptions ? styles.rotated : ""
									}`}
								/>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								{dateOptions.map((option, i) => (
									<DropdownMenuItem key={i}>{option}</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>

				<Chart
					data={values}
					color={"var(--brand-primary)"}
					height={350}
					dot={false}
					tooltip={true}
					fullChart={true}
				/>
			</div>
		</div>
	);
}
