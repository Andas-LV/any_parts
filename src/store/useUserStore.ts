import {create} from 'zustand'
import * as userService from '@/service/user.service'
import { type User} from '@/types/User'

interface UserState {
    user: User | null
    isLoading: boolean
    error: string | null
    fetchUser: () => Promise<void>
    updateUser: (data: Partial<User>) => Promise<void>
    updateAvatar: (file: File) => Promise<void>
    clearError: () => void
}

export const useUserStore = create<UserState>()((set) => ({
    user: {
        id: 1,
        username: 'User Surname',
        email: 'user@gmail.com',
        avatarUrl: '/user.png',
    },
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
    clearError: () => set({ error: null })
}))