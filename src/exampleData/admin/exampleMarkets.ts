import {
	MarketStatuses,
	TMarketsCountry,
	TMarketsList,
	TMarketRequestsList,
	MarketRequestStatuses
} from "@/types/admin/Markets";

const countries = [TMarketsCountry.kazakh, TMarketsCountry.russia];
const statuses = [
	MarketStatuses.active,
	MarketStatuses.notActive,
	MarketStatuses.notStarted,
	MarketStatuses.archive,
];

const reqStatuses = [
	MarketRequestStatuses.new,
	MarketRequestStatuses.seen,
	MarketRequestStatuses.partner,
];

function generateMarkets<StatusType>(prefix: string, statusArray: StatusType[]) {
	return Array.from({ length: 50 }, (v, j) => {
		const i = j + 1;
		return {
			id: i,
			marketName: prefix + i,
			registrationDate: new Date(2020 + (i % 3), i % 12, (i % 28) + 1),
			country: countries[i % countries.length],
			status: statusArray[i % statusArray.length],
			contactNumber: `+7-777-000-${(1000 + i).toString()}`,
			sellsCount: i * 10000,
		} as {
			id: number;
			marketName: string;
			registrationDate: Date;
			country: TMarketsCountry;
			status: StatusType;
			contactNumber: string;
			sellsCount: number;
		};
	});
}

export const exampleMarkets: TMarketsList[] = generateMarkets("Market ", statuses);
export const exampleMarketRequests: TMarketRequestsList[] = generateMarkets("Request Market ", reqStatuses);

