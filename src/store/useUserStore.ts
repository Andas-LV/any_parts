import {create} from 'zustand'
import * as userService from '@/service/user.service'
import { type User} from '@/types/User'
import {Session} from "@/types/Session";

interface UserState {
    user: User | null
    sessions: Session[] | null
    currentSession: Session | null
    isLoading: boolean
    error: string | null

    fetchUser: () => Promise<void>
    updateUser: (data: Partial<User>) => Promise<void>
    updateAvatar: (file: File) => Promise<void>

    createApWallet: () => Promise<void>

    getSessionDevices: () => Promise<void>
    deleteSession: (id: number) => Promise<void>
    deleteOtherSessions: (id: number) => Promise<void>
    clearError: () => void
}

const exampleSessions = [
    {
        id: 1,
        device: "Desktop Window",
        browser: "Chrome 131.0",
        ip: "88.204.136.105",
        location: "Казахстан, Алматы",
        timestamp: "2025-01-27T12:34:00Z",
        isCurrent: true,
    },
    {
        id: 2,
        device: "Desktop Window",
        browser: "Chrome 131.0",
        ip: "88.204.136.105",
        location: "Казахстан, Алматы",
        timestamp: "2024-12-27T12:34:00Z",
        isCurrent: false,
    },
    {
        id: 3,
        device: "Desktop Window",
        browser: "Chrome 131.0",
        ip: "88.204.136.105",
        location: "Казахстан, Астана",
        timestamp: "2024-10-27T12:34:00Z",
        isCurrent: false,
    },
    {
        id: 4,
        device: "Desktop Window",
        browser: "Chrome 131.0",
        ip: "88.204.136.105",
        location: "Казахстан, Алматы",
        timestamp: "2024-12-27T12:34:00Z",
        isCurrent: false,
    },
    {
        id: 5,
        device: "Desktop Window",
        browser: "Chrome 131.0",
        ip: "88.204.136.105",
        location: "Казахстан, Астана",
        timestamp: "2024-10-27T12:34:00Z",
        isCurrent: false,
    }
];

const exampleCurrentSession = exampleSessions.find((session) => session.isCurrent) || null;

export const useUserStore = create<UserState>()((set) => ({
    user: {
        id: 1,
        username: 'User Surname',
        phone: '+77771234568',
        apWallet: false,
        email: 'user@gmail.com',
        avatarUrl: '/user.png',
    },
    sessions: exampleSessions,
    currentSession: exampleCurrentSession,
    isLoading: false,
    error: null,
    fetchUser: async () => {
        set({ isLoading: true, error: null })
        try {
            const user = await userService.getUserMe()
            set({ user })

        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'Failed to fetch user' })
        } finally {
            set({ isLoading: false })
        }
    },
    updateUser: async (data) => {
        set({ isLoading: true, error: null })
        try {
            const updatedUser = await userService.updateUserMe(data)
            set({ user: updatedUser })
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'Failed to update user' })
        } finally {
            set({ isLoading: false })
        }
    },
    updateAvatar: async (file) => {
        set({ isLoading: true, error: null })
        try {
            const updatedUser = await userService.uploadAvatar(file)
            set({ user: updatedUser })
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'Failed to upload avatar' })
        } finally {
            set({ isLoading: false })
        }
    },
    createApWallet: async () => {
        set({ isLoading: true, error: null });
        try {
            // await userService.createApWallet();
            set((state) => ({
                user: {
                    ...state.user,
                    apWallet: true,
                } as UserState["user"],
            }));
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'Failed to upload avatar' });
        } finally {
            set({ isLoading: false });
        }
    },

    getSessionDevices: async () => {
        set({ isLoading: true, error: null })
        try{
            const sessions = await userService.getSessionDevices()
            const currentSession = sessions.find((session) => session.isCurrent) || null;
            set({ sessions, currentSession })
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'Failed to fetch sessions' })
        } finally {
            set({ isLoading: false })
        }
    },
    deleteSession: async (id) => {
        set({ isLoading: true, error: null })
        try{
            // const sessions = await userService.deleteSessionDevice(id)
            set((state) => ({
                sessions: state.sessions?.filter((session) => session.id !== id)
            }));
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'Failed to fetch sessions' })
        } finally {
            set({ isLoading: false })
        }
    },
    deleteOtherSessions: async (id) => {
        set({ isLoading: true, error: null });
        try {
            // await userService.deleteOtherSessions(id);
            set((state) => ({
                sessions: state.currentSession ? [state.currentSession] : []
            }));
        } catch (error) {
            set({ error: error instanceof Error ? error.message : 'Failed to fetch sessions' });
        } finally {
            set({ isLoading: false });
        }
    },

    clearError: () => set({ error: null })
}))