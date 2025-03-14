export interface ChartData {
	medianPrice: number;
	currentPrice: number;
	values: ChartDataPoint[];
}

export interface ChartDataPoint {
	date: string;
	value: number;
}

export const exampleChartData: ChartData = {
	medianPrice: 3500,
	currentPrice: 3050,
	values: [
		{ date: "Янв", value: 25000 },
		{ date: "Февр", value: 24000 },
		{ date: "Март", value: 27000 },
		{ date: "Апр", value: 28500 },
		{ date: "Май", value: 26000 },
		{ date: "Июнь", value: 25000 },
		{ date: "Июль", value: 24500 },
		{ date: "Авг", value: 28000 },
		{ date: "Сен", value: 18000 },
		{ date: "Окт", value: 21000 },
		{ date: "Нояб", value: 26000 },
		{ date: "Дек", value: 30000 },
	],
};
