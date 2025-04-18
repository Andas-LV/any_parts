import { z } from "zod";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import * as partnerAuthService from "@/entities/partners/auth/auth.service";
import { setAuthToken, removeAuthToken, getAuthToken } from "@/configs/cookie";
import { ConfirmCode, Login, PartnerRegister } from "@/types/Auth";

const isClient = typeof window !== "undefined";
const getInitialToken = isClient ? getAuthToken : () => null;

interface PartnerAuthState {
	isAuthenticated: boolean;
	isLoading: boolean;
	error: z.ZodError | string | null;
	email: string | null;

	register: (data: PartnerRegister) => Promise<void>;
	login: (data: Login) => Promise<void>;
	getConfirmCode: (data: Login) => Promise<void>;
	confirmEmail: (data: ConfirmCode) => Promise<void>;
	logout: () => void;
	clearError: () => void;
}

export const usePartnerAuthStore = create<PartnerAuthState>()(
	(set) => ({
		isAuthenticated: !!getInitialToken(),
		isLoading: false,
		error: null,
		email: null,

		register: async (data: PartnerRegister) => {
			set({ isLoading: true, error: null });
			try {
				const response = await partnerAuthService.partnerRegister(data);
				// Assume the response returns an object with a token field.
				await setAuthToken(response.token);
				set({
					isAuthenticated: true,
				});
			} catch (error) {
				if (error instanceof z.ZodError) {
					set({ error });
				} else {
					set({
						error:
							error instanceof Error ? error.message : "Registration failed",
					});
				}
			} finally {
				set({ isLoading: false });
			}
		},

		login: async (data: Login) => {
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

		getConfirmCode: async (data: Login) => {
			set({ isLoading: true, error: null });
			try {
				// await partnerAuthService.getConfirmCode(data);
				// Store the email for later confirmation.
				set({ email: data.email });
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

		logout: async() => {
			await removeAuthToken();
		},

		clearError: () => set({ error: null }),
	}),
);
