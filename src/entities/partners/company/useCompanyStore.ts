import { create } from "zustand";
import {
	addCompany,
	getCompanies,
} from "@/entities/partners/company/company.service";
import { AddCompany, Company } from "@/types/partners/Company";
import { exampleCompanies } from "@/exampleData/exampleCompanies";

interface CompanyState {
	companies: Company[];
	isLoading: boolean;
	error: string | null;

	addCompany: (body: AddCompany) => Promise<void>;
	getCompanies: () => Promise<void>;
	clearError: () => void;
}

export const useCompanyStore = create<CompanyState>((set) => ({
	companies: exampleCompanies,
	isLoading: false,
	error: null,

	addCompany: async (body: AddCompany) => {
		set((state) => ({
			companies: state.companies
				? [
						...state.companies,
						{
							...body,
							id: Date.now(),
							country: "russia",
							organizationType: "массовое",
						},
					]
				: [
						{
							...body,
							id: Date.now(),
							country: "russia",
							organizationType: "массовое",
						},
					],
			isLoading: true,
			error: null,
		}));
		try {
			const newCompany = await addCompany(body);
		} catch (error) {
			set({
				error:
					error instanceof Error
						? error.message
						: "Не удалось добавить компанию",
			});
		} finally {
			set({ isLoading: false });
		}
	},

	getCompanies: async () => {
		set({ isLoading: true, error: null });
		try {
			const companies = await getCompanies();
			set({ companies });
		} catch (error) {
			set({
				error:
					error instanceof Error
						? error.message
						: "Не удалось получить список компаний",
			});
		} finally {
			set({ isLoading: false });
		}
	},

	clearError: () => set({ error: null }),
}));
