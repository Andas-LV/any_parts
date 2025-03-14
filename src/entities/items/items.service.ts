import axiosInstance from "@/lib/axiosInstance";
import { ItemCard, ItemInfoType } from "@/types/items/Item";

export async function getItemCards(): Promise<ItemCard[]> {
	const { data } = await axiosInstance.get("/items/");
	return data;
}

export async function getItemById(id: number): Promise<ItemInfoType> {
	const { data } = await axiosInstance.get(`/items/${id}`);
	return data;
}

export async function toggleFavoriteItem(id: number) {
	const { data } = await axiosInstance.post(`/items/favorites/${id}`);
	return data;
}

export async function getFavoriteItems() {
	const { data } = await axiosInstance.get(`/items/favorites/`);
	return data;
}

export async function refundItem(id: number) {
	const { data } = await axiosInstance.post(`/items/refundItem/${id}`);
	return data;
}

export async function getRefundItems() {
	const { data } = await axiosInstance.get(`/items/refundItems/}`);
	return data;
}

export async function deleteRefundItem(id: number) {
	const { data } = await axiosInstance.delete(`/items/refundItem/${id}`);
	return data;
}
