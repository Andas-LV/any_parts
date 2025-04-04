import axiosInstance from "@/lib/axiosInstance";

export async function getTemplateName() {
	const { data } = await axiosInstance.get("/getTemplateName/");
	return data;
}

export async function createTemplateName() {
	const { data } = await axiosInstance.get("/getTemplateName/");
	return data;
}

export async function getTemplateNameById(id: number){
	const { data } = await axiosInstance.get(`/getTemplateName/${id}/`);
	return data;
}