import {
	TMarketsCountry,
	MarketStatuses, MarketRequestStatuses, TMarketFullInfo
} from "@/types/admin/Markets";
import { TOrganizationType } from "@/types/partners/signUp";
import { Currency } from "@/types/User";

const organizationTypes: TOrganizationType[] = [
	"ИП",
	"ТОО",
	"АО",
];
const cities: Record<keyof typeof TMarketsCountry, string> = {
	kazakh: "Алматы",
	russia: "Москва",
};
const addresses: Record<keyof typeof TMarketsCountry, string> = {
	kazakh: "ул. Байтурсынова, 1",
	russia: "ул. Тверская, 1",
};
const banks: Record<
	keyof typeof TMarketsCountry,
	{ bankName: string; bankCity: string; bankAddress: string }
> = {
	kazakh: {
		bankName: "Казахстанский банк",
		bankCity: "Алматы",
		bankAddress: "Банковская ул., 1",
	},
	russia: {
		bankName: "Российский банк",
		bankCity: "Москва",
		bankAddress: "Красная пл., 1",
	},
};

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


function generateFullInfo<StatusType>(statusArray : StatusType[]) {
	return Array.from({ length: 50 }, (v, j) => {
		const i = j + 1;
		const countryKey = (i % 2 === 0) ? "kazakh" : "russia";
		const countryValue = TMarketsCountry[countryKey];
		const organizationType = organizationTypes[(i - 1) % organizationTypes.length];
		const city = cities[countryKey];
		const address = addresses[countryKey];
		const bankInfo = banks[countryKey];

		return {
			id: i,
			marketName: `Market ${i}`,
			registrationDate: new Date(2020 + (i % 3), i % 12, (i % 28) + 1),
			status: statusArray[i % statusArray.length],
			contactNumber: `+7-777-000-${String(i).padStart(4, "0")}`,
			sellsCount: i * 10,

			organizationName: `Organization ${i}`,
			taxNumber: String(i).padStart(12, "0"),
			organizationType: organizationType,

			country: countryValue,
			city: city,
			address: address,

			document: new File(["dummy content"], `document${i}.pdf`, { type: "application/pdf" }),

			account: String(1000 + i),
			currency: "KZT" as Currency,
			swift: "ABCDEFGH",
			...bankInfo,
		};
	});
}

export const exampleMarketFullInfo: TMarketFullInfo[] = generateFullInfo(statuses);
export const exampleMarketRequestFullInfo = generateFullInfo(reqStatuses);