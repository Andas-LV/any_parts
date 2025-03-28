import { create } from "zustand";
import { TMarketsList, TMarketsCountry } from "@/types/admin/Markets";
import { exampleMarkets } from "@/exampleData/admin/exampleMarkets";

export interface AdminMarketsStore {
	allMarkets: TMarketsList[];
	filterCountry: TMarketsCountry | null;
	filteredMarkets: () => TMarketsList[];
	toggleSelect: (id: number) => void;
	toggleSelectAll: () => void;
	selectedIds: number[];
	selectedMarkets: () => TMarketsList[];
	setFilterCountry: (country: TMarketsCountry | null) => void;
}

export const useAdminMarketsStore = create<AdminMarketsStore>((set, get) => ({
	allMarkets: exampleMarkets,
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
