import axiosInstance from "@/lib/axiosInstance";
import { Currency, type User } from "@/types/User";
import { TChangePassword } from "@/types/admin/Auth";

export async function getUserMe(): Promise<User> {
	const { data } = await axiosInstance.get("/user/me/");
	return data;
}

export async function updateUserMe(body: Partial<User>): Promise<User> {
	const { data } = await axiosInstance.patch("/user/me/update/", body);
	return data;
}

export async function changeCurrency(body: Currency): Promise<User> {
	const { data } = await axiosInstance.patch("/user/me/update/currency/", body);
	return data;
}

export async function changePassword(body: TChangePassword) {
	const { data } = await axiosInstance.post("/user/me/update/password/", body);
	return data;
}

export async function uploadAvatar(avatarFile: File) {
	const formData = new FormData();
	formData.append("avatar", avatarFile);

	const { data } = await axiosInstance.patch("/user/me/avatar/", formData, {
		headers: { "Content-Type": "multipart/form-data" },
	});

	return data;
}

export async function createApWallet() {
	const { data } = await axiosInstance.post("/user/create/apWallet/");
	return data;
}
