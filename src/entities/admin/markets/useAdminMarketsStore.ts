import { create } from "zustand";
import {
	TMarketsList,
	TMarketsCountry,
	TSellsList,
	TMarketRequestsList
} from "@/types/admin/Markets";
import { exampleMarketRequests, exampleMarkets } from "@/exampleData/admin/exampleMarkets";
import { exampleSellsData } from "@/exampleData/admin/exampleSells";

export interface AdminMarketsStore {
	allMarkets: TMarketsList[];
	allSells: TSellsList[];
	allMarketRequests: TMarketRequestsList[];

	filteredMarkets: () => TMarketsList[];
	filteredSells: () => TSellsList[];
	filteredMarketRequests: () => TMarketRequestsList[];

	filterCountry: TMarketsCountry | null;
	toggleSelect: (id: number) => void;
	toggleSelectAll: () => void;
	selectedIds: number[];
	selectedMarkets: () => TMarketsList[];
	setFilterCountry: (country: TMarketsCountry | null) => void;
}

export const useAdminMarketsStore = create<AdminMarketsStore>((set, get) => ({
	allMarkets: exampleMarkets,
	allSells: exampleSellsData,
	allMarketRequests: exampleMarketRequests,

	selectedIds: [],
	filterCountry: null,

	setFilterCountry: (country: TMarketsCountry | null) => {
		set({ filterCountry: country });
	},

	filteredMarkets: () => {
		const { allMarkets, filterCountry } = get();
		if (!filterCountry) return allMarkets;
		return allMarkets.filter((market) => market.country === filterCountry);
	},

	filteredSells: () => {
		const { allSells, filterCountry } = get();
		if (!filterCountry) return allSells;
		return allSells.filter((sell) => sell.market.country === filterCountry);
	},

	filteredMarketRequests: () => {
		const { allMarketRequests, filterCountry } = get();
		if (!filterCountry) return allMarketRequests;
		return allMarketRequests.filter(
			(market) => market.country === filterCountry,
		);
	},

	toggleSelect: (id: number) => {
		set((state) => {
			const isSelected = state.selectedIds.includes(id);
			const newSelectedIds = isSelected
				? state.selectedIds.filter((selectedId) => selectedId !== id)
				: [...state.selectedIds, id];
			return { selectedIds: newSelectedIds };
		});
	},

	toggleSelectAll: () => {
		const { allMarkets, selectedIds } = get();
		const allSelected = selectedIds.length === allMarkets.length;
		const newSelectedIds = allSelected
			? []
			: allMarkets.map((market) => market.id);
		set({ selectedIds: newSelectedIds });
	},

	selectedMarkets: () => {
		const { allMarkets, selectedIds } = get();
		return allMarkets.filter((market) => selectedIds.includes(market.id));
	},
}));
