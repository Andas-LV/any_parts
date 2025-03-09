import axiosInstance from "@/lib/axiosInstance";
import { CartItem } from "@/entities/basket/useBasketStore";

export async function addBasketCard(body: CartItem) {
	const { data } = await axiosInstance.post("/card/register/", body);
	return data;
}

export async function deleteBasketCard(id: number) {
	const { data } = await axiosInstance.delete(`/card/${id}/delete/`);
	return data;
}

export async function deleteAll() {
	const { data } = await axiosInstance.delete(`/card/delete/`);
	return data;
}

export async function getBasketCards() {
	const { data } = await axiosInstance.get("/card/");
	return data;
}
