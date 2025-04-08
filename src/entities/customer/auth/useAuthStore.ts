import { create } from "zustand";
import * as authService from "./auth.service";
import { setAuthToken, removeAuthToken, getAuthToken } from "@/configs/cookie";
import { ConfirmCode, Login, Register } from "@/types/Auth";
import { z } from "zod";
import { confirmEmail, loginSchema } from "@/schemas/auth";

export const isClient = typeof window !== "undefined";

const getInitialToken = isClient ? getAuthToken : () => null;

interface AuthState {
	isAuthenticated: boolean;
	isLoading: boolean;
	error: z.ZodError | string | null;
	email: string | null;

	register: (data: Register) => Promise<void>;
	getConfirmCode: (data: Login) => Promise<void>;
	confirmEmail: (data: ConfirmCode) => Promise<void>;
	logout: () => void;
	clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
	(set) => ({
		isAuthenticated: !!getInitialToken(),
		isLoading: false,
		error: null,
		email: null,

		register: async (data) => {
			set({ isLoading: true, error: null });
			try {
				const response = await authService.register(data);
				setAuthToken(response.token);
				set({
					isAuthenticated: true,
				});
			} catch (error) {
				if (error instanceof z.ZodError) {
					set({ error }); // Сохраняем весь объект ошибки
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

		getConfirmCode: async (body) => {
			set({ isLoading: true, error: null });
			try {
				const parsedData = loginSchema.parse(body); // Здесь может выбросить ошибку
				// const response = await authService.getConfirmCode(parsedData);
				set({ email: body.email });
			} catch (error) {
				if (error instanceof z.ZodError) {
					set({ error });
				} else {
					set({
						error: error instanceof Error ? error.message : "Confirm failed",
					});
				}
			} finally {
				set({ isLoading: false });
			}
		},

		confirmEmail: async (data: ConfirmCode) => {
			set({ isLoading: true, error: null });
			try {
				const validatedData = confirmEmail.parse(data);
				const response = await authService.confirmEmail(validatedData);
				setAuthToken(response.token);
				set({
					isAuthenticated: true,
				});
			} catch (error) {
				if (error instanceof z.ZodError) {
					set({ error });
				} else {
					set({
						error: error instanceof Error ? error.message : "Confirm failed",
					});
				}
			} finally {
				set({ isLoading: false });
			}
		},

		logout: () => {
			removeAuthToken();
		},

		clearError: () => set({ error: null }),
	}),
);
