import { MarketStatuses, TMarketsCountry, TMarketsList } from "@/types/admin/Markets";

export const exampleMarkets: TMarketsList[] = [];

const countries = [TMarketsCountry.kazakh, TMarketsCountry.russia];
const statuses = [
	MarketStatuses.active,
	MarketStatuses.notActive,
	MarketStatuses.notStarted,
	MarketStatuses.archive,
];

for (let i = 1; i <= 50; i++) {
	const market: TMarketsList = {
		id: i,
		marketName: `Market ${i}`,
		// Детерминированная дата: циклично 2020, 2021, 2022; месяцы 0-11; дни от 1 до 28
		registrationDate: new Date(
			2020 + (i % 3),
			i % 12,
			(i % 28) + 1
		),
		// Выбор страны и статуса по циклу
		country: countries[i % countries.length],
		status: statuses[i % statuses.length],
		// Формирование контактного номера с фиксированным шаблоном
		contactNumber: `+7-777-000-${(1000 + i).toString()}`,
		// Количество продаж — фиксированное значение для примера
		sellsCount: i * 10000,
	};

	exampleMarkets.push(market);
}


