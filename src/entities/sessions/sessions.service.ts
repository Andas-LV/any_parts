import { Session } from "@/types/Session";
import axiosInstance from "@/lib/axiosInstance";

export async function getSessionDevices(): Promise<Session[]> {
	const { data } = await axiosInstance.get("/user/me/sessions/");
	return data;
}

export async function deleteSessionDevice(id: number) {
	const { data } = await axiosInstance.delete(`/user/me/sessions/${id}`);
	return data;
}

export async function deleteOtherSessions(id: number) {
	const { data } = await axiosInstance.delete(`/user/me/sessions/${id}`);
	return data;
}
