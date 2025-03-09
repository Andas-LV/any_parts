import { create } from "zustand";
import * as ordersService from "@/entities/orders/orders.service";
import type { TOrder } from "@/types/Orders";
import { z } from "zod";
import { exampleOrders } from "@/exampleData/exampleOrders";

interface OrdersState {
	orders: TOrder[] | null;
	isLoading: boolean;
	error: z.ZodError | string | null;

	getOrders: () => Promise<void>;
	cancelOrder: (id: number) => Promise<void>;
	registerOrder: (data: TOrder) => Promise<void>;
	clearError: () => void;
}

export const useOrdersStore = create<OrdersState>()((set) => ({
	orders: exampleOrders,
	isLoading: false,
	error: null,

	getOrders: async () => {
		set({ isLoading: true, error: null });
		try {
			const orders = await ordersService.getOrders();
			set({ orders });
		} catch (error) {
			set({
				error:
					error instanceof Error ? error.message : "Failed to fetch orders",
			});
		} finally {
			set({ isLoading: false });
		}
	},

	registerOrder: async (data) => {
		set({ isLoading: true, error: null });
		try {
			const orders = await ordersService.makeOrder(data);
			set({ orders });
		} catch (error) {
			set({
				error:
					error instanceof Error ? error.message : "Failed to register order",
			});
		} finally {
			set({ isLoading: false });
		}
	},

	cancelOrder: async (id) => {
		set({ isLoading: true, error: null });
		try {
			// await ordersService.cancelOrder(id);
			set((state) => ({
				orders: state.orders?.filter((order) => order.id !== id),
			}));
		} catch (error) {
			set({
				error: error instanceof Error ? error.message : "Failed to delete card",
			});
		} finally {
			set({ isLoading: false });
		}
	},
	clearError: () => set({ error: null }),
}));
