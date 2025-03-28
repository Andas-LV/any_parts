import { ConfirmCode, Login, PartnerRegister } from "@/types/Auth";
import axiosInstance from "@/lib/axiosInstance";
import { TAdminLogin } from "@/types/admin/Auth";

export async function adminRegister(body: PartnerRegister) {
	const { data } = await axiosInstance.post("/auth/partner/register/", body);
	return data;
}

export async function login(body: TAdminLogin) {
	const { data } = await axiosInstance.post("/auth/admin/login/", body);
	return data;
}

export async function getConfirmCode(body: Login) {
	const { data } = await axiosInstance.post(
		"/auth/admin/getConfirmCode/",
		body,
	);
	return data;
}

export async function confirmEmail(body: ConfirmCode) {
	const { data } = await axiosInstance.post(
		"/auth/admin/confirmEmail/",
		body,
	);
	return data;
}
