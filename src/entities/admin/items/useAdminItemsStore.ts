import { create } from "zustand";
import { TAdminItems, TAdminItemsStatus } from "@/types/admin/Items";
import { exampleAdminItems } from "@/exampleData/admin/exampleItems";

export interface AdminItemsStore {
	allItems: TAdminItems[];
	toggleSelect: (id: number) => void;
	toggleSelectAll: () => void;
	selectedIds: number[];
	selectedItems: () => TAdminItems[];
	removeItem: (id: number) => void;
	sendForRevision: (id: number) => Promise<void>;
	returnItem: (id: number) => Promise<void>;
	isLoading: boolean;
	error: string | null;
}

export const useAdminItemsStore = create<AdminItemsStore>((set, get) => ({
	allItems: exampleAdminItems,
	selectedIds: [],
	isLoading: false,
	error: null,

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
		const { allItems, selectedIds } = get();
		const allSelected = selectedIds.length === allItems.length;
		const newSelectedIds = allSelected ? [] : allItems.map((item) => item.id);
		set({ selectedIds: newSelectedIds });
	},

	selectedItems: () => {
		const { allItems, selectedIds } = get();
		return allItems.filter((item) => selectedIds.includes(item.id));
	},

	removeItem: (id: number) => {
		set((state) => ({
			allItems: state.allItems.filter((item) => item.id !== id),
			selectedIds: state.selectedIds.filter((selectedId) => selectedId !== id),
		}));
		// TODO: Добавить запрос к API для удаления товара на сервере, обернув в try/catch
	},

	sendForRevision: async (id: number) => {
		set({ isLoading: true, error: null });
		try {
			// TODO: Отправить запрос к API для установки статуса товара "На доработке"
			set((state) => ({
				allItems: state.allItems.map((item) =>
					item.id === id ? { ...item, status: TAdminItemsStatus.inRevision } : item
				),
			}));
		} catch (error: any) {
			set({ error: error.message || "Ошибка отправки на доработку" });
		} finally {
			set({ isLoading: false });
		}
	},

	returnItem: async (id: number) => {
		set({ isLoading: true, error: null });
		try {
			// TODO: Отправить запрос к API для возврата товара (например, установить статус "Продается")
			set((state) => ({
				allItems: state.allItems.map((item) =>
					item.id === id ? { ...item, status: TAdminItemsStatus.active } : item
				),
			}));
		} catch (error: any) {
			set({ error: error.message || "Ошибка возврата товара" });
		} finally {
			set({ isLoading: false });
		}
	},
}));
