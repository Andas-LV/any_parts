import { create } from "zustand";
import type {
	TGeneralInfoSchema,
	TCharacteristicsSchema,
	TConfigurationSchema,
	TCreateItemFullInfo,
	TPriceMakingSchema,
} from "@/types/items/CreateItem";

interface CreateItemState {
	generalInfo: TGeneralInfoSchema | null;
	characteristics: TCharacteristicsSchema | null;
	config: TConfigurationSchema | null;
	priceMaking: TPriceMakingSchema | null;
	fullInfo: TCreateItemFullInfo | null;

	isLoading: boolean;
	error: string | null;

	setGeneralInfo: (data: TGeneralInfoSchema | null) => void;
	setCharacteristics: (data: TCharacteristicsSchema | null) => void;
	setConfig: (data: TConfigurationSchema | null) => void;
	setPriceMaking: (data: TPriceMakingSchema | null) => void;
	setFullInfo: () => void;
	clearError: () => void;
}

export const useCreateItemStore = create<CreateItemState>()((set, get) => ({
	generalInfo: null,
	characteristics: null,
	config: null,
	priceMaking: null,
	fullInfo: null,
	isLoading: false,
	error: null,

	setGeneralInfo: (data) => set({ generalInfo: data }),
	setCharacteristics: (data) => set({ characteristics: data }),
	setConfig: (data: TConfigurationSchema | null) => set({ config: data }),
	setPriceMaking: (data) => set({ priceMaking: data }),
	setFullInfo: () => {
		const { generalInfo, characteristics, config, priceMaking } = get();
		if (generalInfo && characteristics && config && priceMaking) {
			set({
				fullInfo: {
					...generalInfo,
					...characteristics,
					...config,
					...priceMaking,
				},
			});
		}
	},
	clearError: () => set({ error: null }),
}));
