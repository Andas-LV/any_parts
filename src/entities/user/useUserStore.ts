import { create } from "zustand";
import * as userService from "@/entities/user/user.service";
import { Currency, type User } from "@/types/User";
import {
	exampleCurrentSession,
	exampleSessions,
} from "@/exampleData/exampleSessions";
import { exampleUser } from "@/exampleData/exampleUser";
import { TProfileTabs } from "@/types/Profile";

interface UserState {
	user: User | null;
	activeProfileTab: TProfileTabs;
	isDealer: boolean;
	isLoading: boolean;
	error: string | null;

	fetchUser: () => Promise<void>;
	updateUser: (data: Partial<User>) => Promise<void>;
	changeCurrency: (currency: Currency) => Promise<void>;
	updateAvatar: (file: File) => Promise<void>;
	setActiveProfileTab: (activeProfileTab: TProfileTabs) => void;
	createApWallet: () => Promise<void>;
	clearError: () => void;
}

export const useUserStore = create<UserState>()((set) => ({
	user: exampleUser,
	isDealer: exampleUser?.role === "dealer",
	activeProfileTab: "main",
	sessions: exampleSessions,
	currentSession: exampleCurrentSession,
	isLoading: false,
	error: null,

	fetchUser: async () => {
		set({ isLoading: true, error: null });
		try {
			const user = await userService.getUserMe();
			set({ user, isDealer: user?.role === "dealer" });
		} catch (error) {
			set({
				error: error instanceof Error ? error.message : "Failed to fetch user",
			});
		} finally {
			set({ isLoading: false });
		}
	},

	updateUser: async (data) => {
		set({ isLoading: true, error: null });
		try {
			set((state) => {
				if (!state.user) {
					return {};
				}
				const updatedUser: User = {
					...state.user,
					...data,
				};
				return { user: updatedUser, isDealer: updatedUser.role === "dealer" };
			});
		} catch (error) {
			set({
				error: error instanceof Error ? error.message : "Failed to update user",
			});
		} finally {
			set({ isLoading: false });
		}
	},

	updateAvatar: async (file) => {
		set({ isLoading: true, error: null });
		try {
			const updatedUser = await userService.uploadAvatar(file);
			set({ user: updatedUser, isDealer: updatedUser?.role === "dealer" });
		} catch (error) {
			set({
				error:
					error instanceof Error ? error.message : "Failed to upload avatar",
			});
		} finally {
			set({ isLoading: false });
		}
	},

	createApWallet: async () => {
		set({ isLoading: true, error: null });
		try {
			// await userService.createApWallet();
			set((state) => ({
				user: state.user ? { ...state.user, apWallet: true } : state.user,
				isDealer: state.user ? state.user.role === "dealer" : false,
			}));
		} catch (error) {
			set({
				error:
					error instanceof Error ? error.message : "Failed to create wallet",
			});
		} finally {
			set({ isLoading: false });
		}
	},

	changeCurrency: async (currency: Currency) => {
		set({ isLoading: true, error: null });
		try {
			set((state) => ({
				user: state.user ? { ...state.user, currency } : null,
				isDealer: state.user ? state.user.role === "dealer" : false,
			}));
		} catch (error) {
			set({
				error:
					error instanceof Error ? error.message : "Failed to change currency",
			});
		} finally {
			set({ isLoading: false });
		}
	},

	setActiveProfileTab: (tab) => set({ activeProfileTab: tab }),
	clearError: () => set({ error: null }),
}));
