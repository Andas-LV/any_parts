import { create } from "zustand";
import * as requisitesService from "@/entities/requisites/requisites.service";
import type { Requisites, RequisiteValidator } from "@/types/Requisites";
import { z } from "zod";
import {exampleReq} from "@/exampleData/exampleReq";

interface PaymentState {
    currentReq: Requisites | null;
    requisites: Requisites[] | null;
    isLoading: boolean;
    error: z.ZodError | string | null;

    getReqs: () => Promise<void>;
    deleteReq: (id: number) => Promise<void>;
    registerReq: (data: RequisiteValidator) => Promise<void>;
    setCurrentReq: (card: Requisites | null) => void;
    clearError: () => void;
}

export const useRequisitesStore = create<PaymentState>()((set) => ({
    requisites: exampleReq,
    currentReq: null,
    isLoading: false,
    error: null,

    getReqs: async () => {
        set({ isLoading: true, error: null });
        try {
            const requisites = await requisitesService.getReqs();
            set({ requisites });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : "Failed to fetch card" });
        } finally {
            set({ isLoading: false });
        }
    },
    deleteReq: async (id) => {
        set({ isLoading: true, error: null });
        try {
            // await paymentService.deleteCard(id);
            set((state) => ({
                requisites: state.requisites?.filter((req) => req.id !== id),
                currentReq: state.currentReq?.id === id ? null : state.currentReq,
            }));
        } catch (error) {
            set({ error: error instanceof Error ? error.message : "Failed to delete card" });
        } finally {
            set({ isLoading: false });
        }
    },
    registerReq: async (data) => {
        set((state) => ({
            requisites: state.requisites
                ? [
                    ...state.requisites,
                    {
                        ...data,
                        id: Date.now(),
                        name: 'Req 1',
                        BIK: 123456,
                        account: 123465789345,
                        fullName: 'Surname Name Middle'
                    },
                ]
                : [
                    {
                        ...data,
                        id: Date.now(),
                        name: 'Req 1',
                        BIK: 123456,
                        account: 123465789345,
                        fullName: 'Surname Name Middle'
                    },
                ],
            isLoading: true,
            error: null,
        }));

        try {
            await requisitesService.registerReq(data);
        } catch (error) {
            set({ error: error instanceof Error ? error.message : "Failed to register card" });
        } finally {
            set({ isLoading: false });
        }
    },
    setCurrentReq: (req) => set({ currentReq: req }),
    clearError: () => set({ error: null }),
}));
