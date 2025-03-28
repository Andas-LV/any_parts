import { TSignUp } from "@/types/partners/signUp";
import { z } from "zod";
import { OrganizationType } from "@/schemas/partners";

export type TMarketFullInfo = Omit<TSignUp, "country"> & TMarketsList;

export type TMarketsList = {
	id: number;
	marketName: string;
	registrationDate: Date;
	country: TMarketsCountry;
	status: MarketStatuses;
	contactNumber: string;
	sellsCount: number;
};

export enum TMarketsCountry {
	kazakh = "Казахстан",
	russia = "Россия",
}

export enum MarketStatuses {
	active = "Активный",
	notActive = "Не продает",
	notStarted = "Ещё не начал",
	archive = "В архиве",
}

export type TMarketStatuses = {
	name: MarketStatuses;
	value: keyof MarketStatuses;
	backgroundColor: string;
};

export const countryOptions = [
	{ key: "all", name: "Все страны", value: "all" },
	{
		key: "kazakh",
		name: "Казахстан",
		value: "kazakh" as keyof TMarketsCountry,
	},
	{
		key: "russia",
		name: "Россия",
		value: "russia" as keyof TMarketsCountry,
	},
];

export type TOrganizationType = z.infer<typeof OrganizationType>;