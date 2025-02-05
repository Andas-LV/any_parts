import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import * as authService from '@/service/auth.service'
import { setAuthToken, removeAuthToken, getAuthToken } from '@/utils/cookie'
import {ConfirmCode, Login, Register} from '@/types/User'
import {z} from "zod";
import {confirmPhone, loginSchema} from "@/schemas";

const isClient = typeof window !== 'undefined'

const getInitialToken = isClient ? getAuthToken : () => null;

interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: z.ZodError | string | null;  // Теперь error может быть ZodError
    phone: string | null;

    register: (data: Register) => Promise<void>;
    getConfirmCode: (data: Login) => Promise<void>;
    confirmPhone: (data: ConfirmCode) => Promise<void>;
    logout: () => void;
    clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: getInitialToken()!,
            isAuthenticated: !!getInitialToken(),
            isLoading: false,
            error: null,
            phone: null,

            register: async (data) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await authService.register(data);
                    setAuthToken(response.token);
                    set({
                        isAuthenticated: true,
                        token: response.token
                    });
                } catch (error) {
                    if (error instanceof z.ZodError) {
                        set({ error }); // Сохраняем весь объект ошибки
                    } else {
                        set({ error: error instanceof Error ? error.message : 'Registration failed' });
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
                    set({ phone: body.phone });
                } catch (error) {
                    if (error instanceof z.ZodError) {
                        set({ error });
                    } else {
                        set({ error: error instanceof Error ? error.message : 'Confirm failed' });
                    }
                } finally {
                    set({ isLoading: false });
                }
            },

            confirmPhone: async (data: ConfirmCode) => {
                set({ isLoading: true, error: null });
                try {
                    const validatedData = confirmPhone.parse(data);
                    const response = await authService.confirmPhone(validatedData);
                    setAuthToken(response.token);
                    set({
                        isAuthenticated: true,
                        token: response.token
                    });
                } catch (error) {
                    if (error instanceof z.ZodError) {
                        set({ error });
                    } else {
                        set({ error: error instanceof Error ? error.message : 'Confirm failed' });
                    }
                } finally {
                    set({ isLoading: false });
                }
            },

            logout: () => {
                removeAuthToken();
                set({ token: null, isAuthenticated: false });
            },

            clearError: () => set({ error: null })
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({ token: state.token }),
            version: 1
        }
    )
);
