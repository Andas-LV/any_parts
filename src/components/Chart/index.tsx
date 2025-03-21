import React from "react";
import {
	AreaChart,
	Area,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
	CartesianGrid,
} from "recharts";
import { useCurrencySymbol } from "@/hooks/useCurrency";
import { useUserStore } from "@/entities/user/useUserStore";
import { ChartDataPoint } from "@/exampleData/exampleChartData";
import styles from "./chart.module.css";

export interface ChartProps {
	data: ChartDataPoint[];
	color: string;
	height?: number | string;
	dot?: boolean;
	tooltip?: boolean;
	fullChart?: boolean;
}

function CustomTooltip({ active, payload }: any) {
	const { user } = useUserStore();
	const currencySymbol = user ? useCurrencySymbol(user.currency) : "";

	if (active && payload && payload.length) {
		const { value, date } = payload[0].payload;
		return (
			<div className={styles.customTooltip}>
				<p>{`${value} ${currencySymbol}`}</p>
				<p className={styles.date}>{date}</p>
			</div>
		);
	}
	return null;
}

export default function Chart({
	data,
	color,
	height = 16,
	dot = false,
	tooltip = false,
	fullChart = false,
}: ChartProps) {
	const areaActiveDot = dot ? undefined : { r: 5, fill: color};
	return (
		<ResponsiveContainer height={height} className={styles.Container}>
			<AreaChart data={data}>
				<defs>
					<linearGradient id="myGradient" x1="0" y1="0" x2="0" y2="1">
						<stop
							offset="0%"
							stopColor={"var(--brand-primary)"}
							stopOpacity="0.5"
						/>
						<stop
							offset="50%"
							stopColor={"var(--brand-primary)"}
							stopOpacity="0"
						/>
					</linearGradient>
				</defs>

				{fullChart && (
					<XAxis
						dataKey="date"
						axisLine={false}
						tickLine={false}
						tickMargin={10}
					/>
				)}

				{fullChart && (
					<YAxis axisLine={false} tickLine={false} tickMargin={0} />
				)}

				{fullChart && (
					<CartesianGrid
						stroke="var(--skeleton)"
						strokeDasharray="5 5"
						horizontal={true}
						vertical={false}
					/>
				)}

				{tooltip && <Tooltip content={<CustomTooltip />}/>}

				<Area
					className={styles.chartArea}
					type="natural"
					dataKey="value"
					stroke={color}
					fill="url(#myGradient)"
					strokeWidth={3}
					dot={dot}
					animationDuration={1000}
					activeDot={areaActiveDot}
				/>
			</AreaChart>
		</ResponsiveContainer>
	);
}
