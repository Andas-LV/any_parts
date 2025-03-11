import { ISearchParams } from "@components/Header/MainHeader/Search/Search";

export const routes = {
	home: () => "/",
	partners: () => `/partners`,
	partnersAuth: () => `/partners/auth`,
	basket: () => `/basket`,
	order: () => `/order`,
	profile: () => `/profile`,
	itemPage: (id: number) => `/item/${id}`,
	searchedPage: ({ value, name }: ISearchParams) =>
		`/search/${value}/?name=${name}`,
};

const slugify = (text: string): string => {
	return text
		.toLowerCase()
		.trim()
		.replace(/\s+/g, "-")
		.replace(/[^\p{L}\p{N}\-]+/gu, ""); // \p{L} – все буквы, \p{N} – цифры
};
