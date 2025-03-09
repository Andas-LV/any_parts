import { create } from "zustand";
import { MIN_PRICE, MAX_PRICE } from "@/exampleData/exampleFilters";

interface FiltersState {
	sale: boolean;
	highRated: boolean;
	brandSearch: string;
	selectedBrands: string[];
	priceRange: number[];
	selectedTypes: string[];
	selectedColors: string[];
	selectedManufacturers: string[];
	setSale: (value: boolean) => void;
	setHighRated: (value: boolean) => void;
	setBrandSearch: (value: string) => void;
	setSelectedBrands: (brands: string[]) => void;
	setPriceRange: (range: number[]) => void;
	setSelectedTypes: (types: string[]) => void;
	setSelectedColors: (colors: string[]) => void;
	setSelectedManufacturers: (manufacturers: string[]) => void;
}

export const useFiltersStore = create<FiltersState>((set) => ({
	sale: false,
	highRated: false,
	brandSearch: "",
	selectedBrands: [],
	priceRange: [MIN_PRICE, MAX_PRICE],
	selectedTypes: [],
	selectedColors: [],
	selectedManufacturers: [],
	setSale: (value) => set({ sale: value }),
	setHighRated: (value) => set({ highRated: value }),
	setBrandSearch: (value) => set({ brandSearch: value }),
	setSelectedBrands: (brands) => set({ selectedBrands: brands }),
	setPriceRange: (range) => set({ priceRange: range }),
	setSelectedTypes: (types) => set({ selectedTypes: types }),
	setSelectedColors: (colors) => set({ selectedColors: colors }),
	setSelectedManufacturers: (manufacturers) =>
		set({ selectedManufacturers: manufacturers }),
}));
