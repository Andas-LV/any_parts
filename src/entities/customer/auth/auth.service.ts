import axiosInstance from "@/lib/axiosInstance";
import { Register, Login, ConfirmCode } from "@/types/Auth";
import { error } from "next/dist/build/output/log";
import Error from "next/error";

export async function register(body: Register) {
	const { data } = await axiosInstance.post("/auth/register/", body);
	return data;
}

export async function login(body: Login) {
	const { data } = await axiosInstance.post("/auth/login/", body);
	return data;
}

export async function confirmEmail(body: ConfirmCode) {
	const { data } = await axiosInstance.post("/auth/confirmEmail/", body);
	return data;
}

interface RefreshResponse {
	success: boolean;
	data: {
		access: string;
	};
	error?: string;
}

// Функция обновления токена
export async function refreshToken(refresh: string): Promise<RefreshResponse> {
	try {
		const response = await axiosInstance.post("/auth/refresh/", refresh);
		return {
			success: true,
			data: {
				access: response.data.access,
			},
		};
	} catch (error) {
		return {
			data: { access: "" },
			success: false,
			error: "Failed to refresh token"
		};
	}
}