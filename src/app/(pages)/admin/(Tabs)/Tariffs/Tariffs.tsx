import React, { useState } from "react";
import styles from "./Tariffs.module.css";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@components/ui/dropdown-menu";
import { dateOptions } from "@/constants/markets";
import { Icons } from "@/assets/svg/svg";
import { exampleMultiPromotionChartData } from "@/exampleData/exampleChartData"
import PromotionFilter from "@/app/(pages)/admin/(Tabs)/Tariffs/PromotionFilter/PromotionFilter";

import dynamic from "next/dynamic";
import PromotionTariffsTable from "@/widgets/tables/PromotionTariffsTable/PromotionTariffsTable";
const MultiLineChart = dynamic(() => import("@components/Chart/PromotionsChart/PromotionsChart"), { ssr: false });

export default function Tariffs() {
	const [isDateOptions, setIsDateOptions] = useState(false);
	return (
		<div className={styles.Tariffs}>
			<div className={styles.chartWrapper}>
				<div className={styles.chartHeader}>
					<h1>Продажи тарифов</h1>

					<div className={styles.filters}>
						<PromotionFilter/>

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

				<MultiLineChart data={exampleMultiPromotionChartData} />
			</div>

			<PromotionTariffsTable/>
		</div>
	);
}
