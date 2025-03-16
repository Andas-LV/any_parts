import { create } from "zustand";
import { tableItems } from "@/exampleData/examplePartnersItems";
import { TableItem } from "@/types/partners/TableItem";

export interface DealerItemsStore {
	tableItems: TableItem[];
	selectedIds: Set<number>;
	toggleSelect: (id: number) => void;
	toggleSelectAll: () => void;
	selectedItems: () => TableItem[];
}

export const useDealerItemsStore = create<DealerItemsStore>((set, get) => ({
	tableItems: tableItems,
	selectedIds: new Set<number>(),

	toggleSelect: (id) => {
		set((state) => {
			const newSelectedIds = new Set(state.selectedIds);
			if (newSelectedIds.has(id)) {
				newSelectedIds.delete(id);
			} else {
				newSelectedIds.add(id);
			}
			return { selectedIds: newSelectedIds };
		});
	},

	toggleSelectAll: () => {
		const state = get();
		const allSelected = state.selectedIds.size === state.tableItems.length;

		set((state) => {
			const newSelectedIds = new Set<number>();
			if (!allSelected) {
				state.tableItems.forEach((item) => newSelectedIds.add(item.id));
			}
			return { selectedIds: newSelectedIds };
		});
	},

	selectedItems: () => {
		const state = get();
		return state.tableItems.filter((item) => state.selectedIds.has(item.id));
	},
}));
