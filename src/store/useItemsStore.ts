import { create } from "zustand";
import type { ItemCard, ItemInfoType } from "@/types/Item";
import {items, itemInfo, itemsForRefund} from "@components/Items/exampleItems";
import {RefundItem} from "@/types/Refund";

interface ItemState {
    items: ItemCard[] | null;
    itemInfo: ItemInfoType[] | null;
    refunds: RefundItem[] | null;
    favoriteItems: ItemCard[] | null;
    currentItem: ItemInfoType | null;

    isLoading: boolean;
    error: string | null;

    fetchItems: () => Promise<void>;
    fetchItemById: (id: number) => Promise<void>;
    toggleFavorite: (id: number) => Promise<void>;
    getFavoriteItems: () => void;

    getRefundItems: () => void;
    refundItem: (id: number) => Promise<void>;
    deleteRefundItem: (id: number) => Promise<void>;

    setCurrentItem: (item: ItemInfoType | null) => void;
    clearError: () => void;
}

export const useItemsStore = create<ItemState>()((set, get) => ({
    items: items,
    itemInfo: itemInfo,

    refunds: null,
    favoriteItems: null,

    currentItem: null,
    isLoading: false,
    error: null,

    fetchItems: async () => {
        set({ isLoading: true, error: null });
        try {
            // const items = await itemService.getItemCards();
            // set({ items });
            // get().getFavoriteItems();
        } catch (error) {
            set({ error: error instanceof Error ? error.message : "Failed to fetch items" });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchItemById: async (id) => {
        set({ isLoading: true, error: null });
        try {
            // const item = await itemService.getItemById(id);
            set({
                currentItem: itemInfo.find((session) => session.id === id) || null
            });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : "Failed to fetch item" });
        } finally {
            set({ isLoading: false });
        }
    },

    toggleFavorite: async (id) => {
        set({ isLoading: true, error: null });
        try {
            set((state) => {
                const updatedItems = state.items?.map((item) =>
                    item.id === id ? { ...item, isFavorite: !item.favorite } : item
                ) || [];

                return { items: updatedItems };
            });

            get().getFavoriteItems(); // Обновляем избранные
        } catch (error) {
            set({ error: error instanceof Error ? error.message : "Failed to toggle favorite" });
        } finally {
            set({ isLoading: false });
        }
    },

    getFavoriteItems: () => {
        const state = get();
        set({
            favoriteItems: state.items?.filter((item) => item.favorite) || []
        });
    },

    getRefundItems: async() => {
        set({ isLoading: true, error: null });
        try {
            // const refunds = await itemService.getRefundItems();
            set({
                refunds: itemsForRefund
            });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : "Failed to fetch refund items" });
        } finally {
            set({ isLoading: false });
        }
    },

    refundItem: async(id) => {
        set({ isLoading: true, error: null });
        try {
            // const refunds = await itemService.refundItem(id);
            set({
                refunds: itemsForRefund
            });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : "Failed to fetch refund items" });
        } finally {
            set({ isLoading: false });
        }
    },

    deleteRefundItem: async(id) => {
        set({ isLoading: true, error: null });

        try {
            // const refunds = await itemService.deleteRefundItem(id);
            set((state) => ({
                refunds: state.refunds?.filter((item) => item.id !== id),
            }));
        } catch (error) {
            set({ error: error instanceof Error ? error.message : "Failed to fetch refund items" });
        } finally {
            set({ isLoading: false });
        }
    },

    setCurrentItem: (item) => set({ currentItem: item }),
    clearError: () => set({ error: null }),
}));
