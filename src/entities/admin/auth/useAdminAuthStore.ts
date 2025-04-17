import { z } from "zod";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { setAuthToken, removeAuthToken, getAuthToken } from "@/configs/cookie";
import { ConfirmCode, TAdminLogin, TNewPassword } from "@/types/admin/Auth";

const isClient = typeof window !== "undefined";
const getInitialToken = isClient ? getAuthToken : () => null;

interface PartnerAuthState {
	isAuthenticated: boolean;
	isLoading: boolean;
	error: z.ZodError | string | null;
	email: string | null;

	login: (data: TAdminLogin) => Promise<void>;
	getConfirmCode: (email: string) => Promise<void>;
	confirmEmail: (data: ConfirmCode) => Promise<void>;
	refreshPassword: (data: TNewPassword) => Promise<void>;
	logout: () => void;
	clearError: () => void;
}

export const useAdminAuthStore = create<PartnerAuthState>()(
	(set) => ({
		isAuthenticated: !!getInitialToken(),
		isLoading: false,
		error: null,
		email: null,

		login: async (data: TAdminLogin) => {
			set({ isLoading: true, error: null });
			try {
				// const response = await partnerAuthService.login(data);
				// setAuthToken(response.token);
				set({
					// token: response.token,
					isAuthenticated: true,
					email: data.email,
				});
			} catch (error) {
				if (error instanceof z.ZodError) {
					set({ error });
				} else {
					set({
						error: error instanceof Error ? error.message : "Login failed",
					});
				}
			} finally {
				set({ isLoading: false });
			}
		},

		getConfirmCode: async (email: string) => {
			set({ isLoading: true, error: null });
			try {
				// await partnerAuthService.getConfirmCode(data);
				// Store the email for later confirmation.
				set({ email: email });
			} catch (error) {
				if (error instanceof z.ZodError) {
					set({ error });
				} else {
					set({
						error:
							error instanceof Error
								? error.message
								: "Get confirm code failed",
					});
				}
			} finally {
				set({ isLoading: false });
			}
		},

		confirmEmail: async (data: ConfirmCode) => {
			set({ isLoading: true, error: null });
			try {
				// const response = await partnerAuthService.confirmEmail(data);
				// setAuthToken(response.token);
				set({
					// token: response.token,
					isAuthenticated: true,
				});
			} catch (error) {
				if (error instanceof z.ZodError) {
					set({ error });
				} else {
					set({
						error:
							error instanceof Error ? error.message : "Confirm email failed",
					});
				}
			} finally {
				set({ isLoading: false });
			}
		},

		refreshPassword: async(data: TNewPassword) => {
			set({ isLoading: true, error: null });
			try {
				// const response = await partnerAuthService.confirmEmail(data);
				// setAuthToken(response.token);
				set({
					// token: response.token,
					isAuthenticated: true,
				});
			} catch (error) {
				if (error instanceof z.ZodError) {
					set({ error });
				} else {
					set({
						error:
							error instanceof Error ? error.message : "Confirm email failed",
					});
				}
			} finally {
				set({ isLoading: false });
			}
		},

		logout: async() => {
			await removeAuthToken();
		},

		clearError: () => set({ error: null }),
	}),
);
