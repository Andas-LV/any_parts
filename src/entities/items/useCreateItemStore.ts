import { create } from "zustand";
import type {
  TGeneralInfoSchema,
  TCharacteristicsSchema,
  TConfigurationSchema,
  TCreateItemFullInfo,
} from "@/types/CreateItem";

interface CreateItemState {
  generalInfo: TGeneralInfoSchema | null;
  characteristics: TCharacteristicsSchema | null;
  config: TConfigurationSchema | null;
  fullInfo: TCreateItemFullInfo | null;

  isLoading: boolean;
  error: string | null;

  setGeneralInfo: (data: TGeneralInfoSchema | null) => void;
  setCharacteristics: (data: TCharacteristicsSchema | null) => void;
  setConfig: (data: TConfigurationSchema | null) => void;
  setFullInfo: () => void;
  clearError: () => void;
}

export const useCreateItemStore = create<CreateItemState>()((set, get) => ({
  generalInfo: null,
  characteristics: null,
  config: null,
  fullInfo: null,
  isLoading: false,
  error: null,

  setGeneralInfo: (data) => set({ generalInfo: data }),
  setCharacteristics: (data) => set({ characteristics: data }),
  setConfig: (data: TConfigurationSchema | null) => set({ config: data }),
  setFullInfo: () => {
    const { generalInfo, characteristics, config } = get();
    if (generalInfo && characteristics && config) {
      set({ fullInfo: { ...generalInfo, ...characteristics, ...config } });
    }
  },
  clearError: () => set({ error: null }),
}));
