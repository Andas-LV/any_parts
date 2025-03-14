import { create } from "zustand";
import type {
	TCheckData,
	TAddressRegister,
	TDocumentType,
	TRequisites,
	TSignUp,
} from "@/types/partners/signUp";

interface SignUpState {
	checkData: TCheckData | null;
	addressRegister: TAddressRegister | null;
	document: TDocumentType | null;
	requisites: TRequisites | null;
	fullSignUp: TSignUp | null;

	isLoading: boolean;
	error: string | null;

	setCheckData: (data: TCheckData | null) => void;
	setAddressRegister: (data: TAddressRegister | null) => void;
	setDocument: (data: TDocumentType | null) => void;
	setRequisites: (data: TRequisites | null) => void;
	setFullSignUp: () => void;
	clearError: () => void;
}

export const usePartnersSignUpStore = create<SignUpState>()((set, get) => ({
	checkData: null,
	addressRegister: null,
	document: null,
	requisites: null,
	fullSignUp: null,
	isLoading: false,
	error: null,

	setCheckData: (data) => set({ checkData: data }),
	setAddressRegister: (data) => set({ addressRegister: data }),
	setDocument: (data) => set({ document: data }),
	setRequisites: (data) => set({ requisites: data }),

	setFullSignUp: () => {
		const { checkData, addressRegister, document, requisites } = get();
		if (checkData && addressRegister && document && requisites) {
			set({
				fullSignUp: {
					...checkData,
					...addressRegister,
					...document,
					...requisites,
				},
			});
		}
	},

	clearError: () => set({ error: null }),
}));
