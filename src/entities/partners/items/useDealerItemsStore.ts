import { create } from "zustand";
import { tableItems } from "@/exampleData/partners/examplePartnersItems";
import { TPartnersItem, ItemStatusValues } from "@/types/partners/Items";
import { PartnerFeedback, PartnerQuestion } from "@/types/partners/Feedbacks";
import {
	examplePartnerFeedbacks,
	examplePartnerQuestions,
} from "@/exampleData/partners/examplePartnersFeedbacks";

export interface DealerItemsStore {
	allItems: TPartnersItem[];
	filteredItems: () => TPartnersItem[];
	itemFeedbacks: PartnerFeedback[];
	itemQuestions: PartnerQuestion[];

	selectedIds: number[];
	filterStatus: ItemStatusValues[];
	setFilterStatus: (statuses: ItemStatusValues[]) => void;
	toggleSelect: (id: number) => void;
	toggleSelectAll: () => void;
	selectedItems: () => TPartnersItem[];
}

export const useDealerItemsStore = create<DealerItemsStore>((set, get) => ({
	allItems: tableItems,
	itemFeedbacks: examplePartnerFeedbacks,
	itemQuestions: examplePartnerQuestions,
	selectedIds: [],
	filterStatus: [],

	setFilterStatus: (statuses) => {
		set({ filterStatus: statuses });
	},

	filteredItems: () => {
		const state = get();
		if (state.filterStatus.length === 0) return state.allItems;
		return state.allItems.filter((item) =>
			state.filterStatus.some((status) => item.statuses.includes(status)),
		);
	},

	toggleSelect: (id) => {
		set((state) => {
			const isSelected = state.selectedIds.includes(id);
			const newSelectedIds = isSelected
				? state.selectedIds.filter((selectedId) => selectedId !== id)
				: [...state.selectedIds, id];
			return { selectedIds: newSelectedIds };
		});
	},

	toggleSelectAll: () => {
		const state = get();
		const allSelected = state.selectedIds.length === state.allItems.length;

		const newSelectedIds = allSelected
			? []
			: state.allItems.map((item) => item.id);

		set({ selectedIds: newSelectedIds });
	},

	selectedItems: () => {
		const state = get();
		return state.allItems.filter((item) => state.selectedIds.includes(item.id));
	},
}));
