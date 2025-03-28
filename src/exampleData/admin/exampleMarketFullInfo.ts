import {
	TMarketFullInfo,
	TMarketsCountry,
	MarketStatuses,
	TOrganizationType,
} from "@/types/admin/Markets";

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

export const exampleMarketFullInfo: TMarketFullInfo[] = [];

for (let i = 1; i <= 50; i++) {
	const countryKey = i % 2 === 0 ? "kazakh" : "russia";
	const countryValue =
		TMarketsCountry[countryKey as keyof typeof TMarketsCountry];

	const organizationType = organizationTypes[i % organizationTypes.length];
	const city = cities[countryKey as keyof typeof cities];
	const address = addresses[countryKey as keyof typeof addresses];
	const bankInfo = banks[countryKey as keyof typeof banks];

	const fullInfo: TMarketFullInfo = {
		id: i,
		marketName: `Market ${i}`,
		registrationDate: new Date(2020 + (i % 3), i % 12, (i % 28) + 1),
		status: statuses[i % statuses.length],
		contactNumber: `+7-777-000-${String(i).padStart(4, "0")}`,
		sellsCount: i * 10,

		organizationName: `Organization ${i}`,
		taxNumber: String(i).padStart(12, "0"),
		organizationType: organizationType,

		country: countryValue,
		city: city,
		address: address,

		document: new File(["dummy content"], `document${i}.pdf`, {
			type: "application/pdf",
		}),

		account: String(1000 + i),
		currency: "KZT",
		swift: "ABCDEFGH",
		bankName: bankInfo.bankName,
		bankCity: bankInfo.bankCity,
		bankAddress: bankInfo.bankAddress,
	};

	exampleMarketFullInfo.push(fullInfo);
}
