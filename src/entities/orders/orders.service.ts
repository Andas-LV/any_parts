import axiosInstance from '@/lib/axiosInstance';
import {TOrder} from "@/types/Orders";

export async function makeOrder(body: TOrder) {
    const { data } = await axiosInstance.post('/orders/register/', body);
    return data;
}

export async function getOrders(): Promise<TOrder[]> {
    const { data } = await axiosInstance.get('/orders/');
    return data;
}

export async function cancelOrder(id: number) {
    const { data } = await axiosInstance.delete(`/orders/${id}/cancel/`,);
    return data;
}
