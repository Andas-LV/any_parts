import axios from "axios";
import { toSnakeCase, toCamelCase } from "@/utils/serviceConverters";

const axiosInstance = axios.create({
	baseURL: process.env.NEXT_BACKEND_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// 👉 Request interceptor
axiosInstance.interceptors.request.use((config) => {
	if (typeof window !== "undefined") {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
	}

	if (config.data && typeof config.data === "object") {
		config.data = toSnakeCase(config.data);
	}

	if (config.params && typeof config.params === "object") {
		config.params = toSnakeCase(config.params);
	}

	return config;
});

axiosInstance.interceptors.response.use(
	(response) => {
		if (response.data && typeof response.data === "object") {
			response.data = toCamelCase(response.data);
		}
		return response;
	},
	(error) => {
		if (
			error.response &&
			error.response.data &&
			typeof error.response.data === "object"
		) {
			error.response.data = toCamelCase(error.response.data);
		}
		return Promise.reject(error);
	},
);

export default axiosInstance;
