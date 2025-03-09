"use client";

import React from "react";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";
import { useCurrencySymbol } from "@/hooks/useCurrency";
import { useUserStore } from "@/entities/user/useUserStore";
import { ChartDataPoint } from "@/exampleData/exampleChartData";
import styles from "./chart.module.css";

export interface ChartProps {
	data: ChartDataPoint[];
	color: string;
	height?: number;
	dot?: boolean;
	tooltip?: boolean;
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
}: ChartProps) {
	return (
		<ResponsiveContainer width="100%" height={height}>
			<LineChart data={data}>
				{tooltip && <Tooltip content={<CustomTooltip />} />}

				<Line
					type="monotone"
					dataKey="value"
					stroke={color}
					strokeWidth={2}
					dot={dot}
				/>
			</LineChart>
		</ResponsiveContainer>
	);
}
