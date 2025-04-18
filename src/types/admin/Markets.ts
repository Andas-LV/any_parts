import { TSignUp } from "@/types/partners/signUp";
import { User } from "@/types/User";
import { TPartnersItem } from "@/types/partners/Items";

export type TMarketFullInfo = Omit<TSignUp, "country"> & (TMarketsList | TMarketRequestsList);

export type TMarketsList = {
	id: number;
	marketName: string;
	registrationDate: Date;
	country: TMarketsCountry;
	status: MarketStatuses;
	contactNumber: string;
	sellsCount: number;
};

export type TMarketRequestsList = Omit<TMarketsList, 'status'> & { status: MarketRequestStatuses };

export type TSellsList = {
	id: number;
	item: Partial<TPartnersItem>;
	market: Partial<TMarketsList>;
	customer:Partial<User>;
	sellDate: Date;
	sellAmount: number;
}

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

export enum MarketRequestStatuses {
	new = "Новый",
	seen = "Просмотрен",
	partner = "Партнер",
}

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

export type ModalType = "fullInfo" | "cancel" | null;
