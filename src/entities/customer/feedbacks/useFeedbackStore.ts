import { create } from "zustand";
import * as feedbacksService from "./feedbacks.service";
import { TMyFeedbackCard } from "@/types/Feedbacks";
import { TOrder } from "@/types/Orders";
import { exampleMyFeedbackCards } from "@/exampleData/exampleFeedbacks";
import { exampleOrders } from "@/exampleData/exampleOrders";

interface FeedbacksState {
	myFeedbacks: TMyFeedbackCard[] | null;
	unRatedOrders: TOrder[] | null;
	questions: string[] | null;
	isLoading: boolean;
	error: string | null;

	getMyFeedbacks: () => Promise<void>;
	getUnratedOrders: () => Promise<void>;
	getQuestions: () => Promise<void>;
	clearError: () => void;
}

export const useFeedbacksStore = create<FeedbacksState>()((set) => ({
	myFeedbacks: exampleMyFeedbackCards,
	unRatedOrders: exampleOrders,
	questions: null,
	isLoading: false,
	error: null,

	getMyFeedbacks: async () => {
		set({ isLoading: true, error: null });
		try {
			const myFeedbacks = await feedbacksService.getMyFeedbacks();
			set({ myFeedbacks });
		} catch (error) {
			set({
				error:
					error instanceof Error ? error.message : "Failed to fetch feedbacks",
			});
		} finally {
			set({ isLoading: false });
		}
	},

	getUnratedOrders: async () => {
		set({ isLoading: true, error: null });
		try {
			const unRatedOrders = await feedbacksService.getUnratedOrders();
			set({ unRatedOrders });
		} catch (error) {
			set({
				error:
					error instanceof Error ? error.message : "Failed to fetch feedbacks",
			});
		} finally {
			set({ isLoading: false });
		}
	},

	getQuestions: async () => {
		set({ isLoading: true, error: null });
		try {
			const questions = await feedbacksService.getQuestions();
			set({ questions });
		} catch (error) {
			set({
				error:
					error instanceof Error ? error.message : "Failed to fetch feedbacks",
			});
		} finally {
			set({ isLoading: false });
		}
	},

	clearError: () => set({ error: null }),
}));
