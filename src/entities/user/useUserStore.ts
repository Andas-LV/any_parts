import { create } from "zustand";
import * as userService from "@/entities/user/user.service";
import { Currency, type User } from "@/types/User";
import {
	exampleCurrentSession,
	exampleSessions,
} from "@/exampleData/exampleSessions";
import { exampleUser } from "@/exampleData/exampleUser";
import { TProfileTabs } from "@/app/(pages)/profile/page";
import { PartnersTabs } from "@/app/(pages)/partners/page";
import { TChangePassword } from "@/types/admin/Auth";

interface UserState {
	user: User | null;
	activeProfileTab: TProfileTabs;
	activePartnersTab: PartnersTabs;
	isDealer: boolean;
	isModerated: boolean;
	isLoading: boolean;
	error: string | null;

	fetchUser: () => Promise<void>;
	updateUser: (data: Partial<User>) => Promise<void>;
	changeCurrency: (currency: Currency) => Promise<void>;
	changePassword: (data: TChangePassword) => Promise<void>;
	updateAvatar: (file: File) => Promise<void>;
	createApWallet: () => Promise<void>;
	setModeratedUser: (moderation: boolean) => Promise<void>;
	setActiveProfileTab: (activeProfileTab: TProfileTabs) => void;
	setActivePartnersTab: (activePartnersTab: PartnersTabs) => void;
	clearError: () => void;
}

export const useUserStore = create<UserState>()((set) => ({
	user: exampleUser,
	isDealer: exampleUser?.role === "dealer",
	isModerated: exampleUser?.moderated === true,
	activeProfileTab: "main",
	activePartnersTab: "main",
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

	changePassword: async (data: TChangePassword) => {
		set({ isLoading: true, error: null });
		try {
			await userService.changePassword(data);
		} catch (error) {
			set({
				error:
					error instanceof Error ? error.message : "Failed to change password",
			});
		} finally {
			set({ isLoading: false });
		}
	},

	setModeratedUser: async (moderation) => {
		set({ isLoading: true, error: null });
		try {
			set((state) => ({
				user: state.user
					? { ...state.user, moderation: { moderated: moderation } }
					: null,
				isModerated: moderation,
			}));
		} catch (error) {
			set({
				error:
					error instanceof Error ? error.message : "Failed to moderate user",
			});
		} finally {
			set({ isLoading: false });
		}
	},

	setActivePartnersTab: (tab: PartnersTabs) => set({ activePartnersTab: tab }),
	setActiveProfileTab: (tab) => set({ activeProfileTab: tab }),
	clearError: () => set({ error: null }),
}));
