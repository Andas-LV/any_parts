import {create} from 'zustand'
import * as sessionsService from '@/entities/sessions/sessions.service'
import {Session} from "@/types/Session";
import {exampleCurrentSession, exampleSessions} from "@/exampleData/exampleSessions";

interface UserState {
    sessions: Session[] | null
    currentSession: Session | null

    isLoading: boolean
    error: string | null

    getSessionDevices: () => Promise<void>
    deleteSession: (id: number) => Promise<void>
    deleteOtherSessions: (id: number) => Promise<void>
    clearError: () => void
}

export const useSessionsStore = create<UserState>()((set) => ({
    sessions: exampleSessions,
    currentSession: exampleCurrentSession,
    isLoading: false,
    error: null,

    getSessionDevices: async () => {
        set({ isLoading: true, error: null })
        try{
            const sessions = await sessionsService.getSessionDevices()
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
            // const sessions = await sessionsService.deleteSessionDevice(id)
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
            // await sessionsService.deleteOtherSessions(id);
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