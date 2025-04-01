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

export interface MultiPromotionChartDataPoint {
	date: string;
	standardPromotion: number;
	premiumPromotion: number;
}

export const exampleMultiPromotionChartData: MultiPromotionChartDataPoint[] = [
	{ date: "Янв", standardPromotion: 200000, premiumPromotion: 180000 },
	{ date: "Февр", standardPromotion: 150000, premiumPromotion: 160000 },
	{ date: "Март", standardPromotion: 180000, premiumPromotion: 140000 },
	{ date: "Апр", standardPromotion: 230000, premiumPromotion: 130000 },
	{ date: "Май", standardPromotion: 170000, premiumPromotion: 120000 },
	{ date: "Июнь", standardPromotion: 160000, premiumPromotion: 250000 },
	{ date: "Июль", standardPromotion: 140000, premiumPromotion: 251000 },
	{ date: "Авг", standardPromotion: 180000, premiumPromotion: 240000 },
	{ date: "Сен", standardPromotion: 190000, premiumPromotion: 220000 },
	{ date: "Окт", standardPromotion: 220000, premiumPromotion: 260000 },
	{ date: "Нояб", standardPromotion: 210000, premiumPromotion: 200000 },
	{ date: "Дек", standardPromotion: 240000, premiumPromotion: 240000 },
];