import { ISearchParams } from "@components/headers/CustomerHeader/MainHeader/Search/Search";

export const routes = {
	home: () => "/",

	partners: () => `/partners`,
	partnersAuth: () => `/partners/auth`,
	partnersSettings: () => `/partners/settings`,

	admin: () => `/admin`,
	adminAuth: () => `/admin/auth`,
	adminSettings: () => `/admin/settings`,

	basket: () => `/basket`,
	order: () => `/order`,
	profile: () => `/profile`,
	itemPage: (id: number) => `/item/${id}`,
	searchedPage: ({ value, name }: ISearchParams) =>
		`/search/${value}/?name=${name}`,
};
