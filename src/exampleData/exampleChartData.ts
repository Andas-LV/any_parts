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
  medianPrice: 2500,
  currentPrice: 2450,
  values: [
    { date: "12 дек - 19 дек", value: 2500 },
    { date: "19 дек - 26 дек", value: 2400 },
    { date: "26 дек - 03 янв", value: 2700 },
    { date: "03 янв - 10 янв", value: 2850 },
    { date: "10 янв - 17 янв", value: 2600 },
    { date: "17 янв - 24 янв", value: 2500 },
    { date: "24 янв - 31 янв", value: 2450 },
  ],
};
