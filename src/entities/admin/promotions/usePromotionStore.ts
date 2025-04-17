import { create } from "zustand";
import { examplePromotions } from "@/exampleData/admin/examplePromotions";
import { TPromotionTable } from "@/types/Promotions";

export interface PromotionStore {
	promotions: TPromotionTable[];
	selectedIds: string[];
	editingId: string | null;
	tempPrice: string;
	isLoading: boolean;
	error: string | null;

	// Actions
	toggleSelectPromotion: (promotionValue: string) => void;
	startEditing: (promotionValue: string) => void;
	updateTempPrice: (newPrice: string) => void;
	savePrice: (promotionValue: string) => void;
	changePromoPrice: (promotionValue: string, price: number) => void;
}

export const usePromotionsStore = create<PromotionStore>((set, get) => ({
	promotions: examplePromotions,
	selectedIds: [],
	editingId: null,
	tempPrice: "",
	isLoading: false,
	error: null,

	toggleSelectPromotion: (promotionValue: string) => {
		set((state) => {
			const isSelected = state.selectedIds.includes(promotionValue);
			return {
				selectedIds: isSelected
					? state.selectedIds.filter((id) => id !== promotionValue)
					: [...state.selectedIds, promotionValue],
			};
		});
	},

	startEditing: (promotionValue: string) => {
		const currentPromo = get().promotions.find((p) => p.value === promotionValue);
		set({
			editingId: promotionValue,
			tempPrice: currentPromo ? String(currentPromo.cost) : "0",
		});
	},

	updateTempPrice: (newPrice: string) => {
		set({ tempPrice: newPrice });
	},

	savePrice: (promotionValue: string) => {
		const newPrice = parseFloat(get().tempPrice) || 0;
		set({ isLoading: true });
		// Simulate API call
		setTimeout(() => {
			set((state) => ({
				promotions: state.promotions.map((promo) =>
					promo.value === promotionValue ? { ...promo, cost: newPrice } : promo
				),
				editingId: null,
				tempPrice: "",
				isLoading: false,
			}));
		}, 1000);
	},

	changePromoPrice: (promotionValue: string, price: number) => {
		set((state) => ({
			promotions: state.promotions.map((promo) =>
				promo.value === promotionValue ? { ...promo, cost: price } : promo
			),
		}));
	},
}));