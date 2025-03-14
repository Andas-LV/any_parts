import { AddCompany } from "@/types/partners/Company";
import axiosInstance from "@/lib/axiosInstance";

export async function addCompany(body: AddCompany) {
	const { data } = await axiosInstance.post("/add/company/", body);
	return data;
}

export async function getCompanies() {
	const { data } = await axiosInstance.get("/add/company/");
	return data;
}
