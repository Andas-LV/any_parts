import React from "react";
import {
	ResponsiveContainer,
	AreaChart,
	Area,
	Tooltip,
	XAxis,
	YAxis,
	CartesianGrid,
} from "recharts";
import { useCurrencySymbol } from "@/hooks/useCurrency";
import { useUserStore } from "@/entities/user/useUserStore";
import { useAdminMarketsStore } from "@/entities/admin/markets/useAdminMarketsStore";
import styles from "./PromotionsChart.module.css";

export interface ChartDataPoint {
	date: string;
	standardPromotion?: number;
	premiumPromotion?: number;
}

interface MultiLineChartProps {
	data: ChartDataPoint[];
	height?: number;
}

type values = {
	name: string;
	value: number;
};

export function CustomTooltip({ active, payload }: any) {
	const { user } = useUserStore();
	const currencySymbol = user ? useCurrencySymbol(user.currency) : "";

	if (active && payload && payload.length) {
		const { payload: item } = payload[0];
		const values: values[] = payload.map((entry: any) => ({
			name: entry.name,
			value: entry.value,
		}));

		return (
			<div className={styles.customTooltip}>
				{values.map((value: values, index: number) => (
					<p key={index}>
						{value.value} {currencySymbol} – {value.name}
					</p>
				))}
				<p className={styles.date}>{item.date}</p>
			</div>
		);
	}
	return null;
}

export default function MultiLineChart({
	data,
	height = 300,
}: MultiLineChartProps) {
	const { filterPromotions } = useAdminMarketsStore();

	const colors: Record<string, string> = {
		standardPromotion: "var(--brand-primary)",
		premiumPromotion: "#8a0ce4",
	};

	return (
		<ResponsiveContainer
			width="100%"
			height={height}
			className={styles.PromotionsChart}
		>
			<AreaChart data={data}>
				<defs>
					{filterPromotions.map((promo) => (
						<linearGradient
							key={promo}
							id={`gradient-${promo}`}
							x1="0"
							y1="0"
							x2="0"
							y2="1"
						>
							<stop offset="0%" stopColor={colors[promo]} stopOpacity={0.4} />
							<stop offset="100%" stopColor={colors[promo]} stopOpacity={0} />
						</linearGradient>
					))}
				</defs>

				<XAxis
					dataKey="date"
					axisLine={false}
					tickLine={false}
					tickMargin={10}
				/>
				<YAxis axisLine={false} tickLine={false} tickMargin={10} />
				<CartesianGrid
					stroke="var(--skeleton)"
					strokeDasharray="5 5"
					horizontal={true}
					vertical={false}
				/>

				<Tooltip content={<CustomTooltip />} />

				{filterPromotions.map((promo) => (
					<Area
						key={promo}
						type="natural"
						dataKey={promo}
						name={promo === "standardPromotion" ? "Стандарт" : "Премиум"}
						stroke={colors[promo]}
						fill={`url(#gradient-${promo})`}
						strokeWidth={3}
						dot={false}
						activeDot={{ r: 5 }}
						animationDuration={1000}
					/>
				))}
			</AreaChart>
		</ResponsiveContainer>
	);
}
