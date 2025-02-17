import { create } from "zustand";
import * as paymentService from "@/entities/payment/payment.service";
import type { Payment, PaymentCardValidator } from "@/types/Payment";
import { z } from "zod";
import {examplePayments} from "@/exampleData/examplePayments";

interface PaymentState {
    currentCard: Payment | null;
    cards: Payment[] | null;
    isLoading: boolean;
    error: z.ZodError | string | null;

    getCard: () => Promise<void>;
    deleteCard: (id: number) => Promise<void>;
    registerCard: (data: PaymentCardValidator) => Promise<void>;
    setCurrentCard: (card: Payment | null) => void;
    clearError: () => void;
}

export const usePaymentStore = create<PaymentState>()((set) => ({
    cards: examplePayments,
    currentCard: null,
    isLoading: false,
    error: null,

    getCard: async () => {
        set({ isLoading: true, error: null });
        try {
            const cards = await paymentService.getCard();
            set({ cards });
        } catch (error) {
            set({ error: error instanceof Error ? error.message : "Failed to fetch card" });
        } finally {
            set({ isLoading: false });
        }
    },
    deleteCard: async (id) => {
        set({ isLoading: true, error: null });
        try {
            // await paymentService.deleteCard(id);
            set((state) => ({
                cards: state.cards?.filter((card) => card.id !== id),
                currentCard: state.currentCard?.id === id ? null : state.currentCard,
            }));
        } catch (error) {
            set({ error: error instanceof Error ? error.message : "Failed to delete card" });
        } finally {
            set({ isLoading: false });
        }
    },
    registerCard: async (data) => {
        set((state) => ({
            cards: state.cards
                ? [
                    ...state.cards,
                    {
                        ...data,
                        id: Date.now(),
                        isActive: false,
                        type: "Visa",
                    },
                ]
                : [
                    {
                        ...data,
                        id: Date.now(),
                        isActive: false,
                        type: "Visa",
                    },
                ],
            isLoading: true,
            error: null,
        }));

        try {
            await paymentService.registerCard(data);
        } catch (error) {
            set({ error: error instanceof Error ? error.message : "Failed to register card" });
        } finally {
            set({ isLoading: false });
        }
    },
    setCurrentCard: (card) => set({ currentCard: card }),
    clearError: () => set({ error: null }),
}));
