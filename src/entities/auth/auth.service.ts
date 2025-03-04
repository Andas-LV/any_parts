import axiosInstance from "@/lib/axiosInstance";
import { Register, Login, ConfirmCode } from "@/types/Auth";

export async function register(body: Register) {
  const { data } = await axiosInstance.post("/auth/register/", body);
  return data;
}

export async function login(body: Login) {
  const { data } = await axiosInstance.post("/auth/login/", body);
  return data;
}

export async function getConfirmCode(body: Login) {
  const { data } = await axiosInstance.post("/auth/getConfirmCode/", body);
  return data;
}

export async function confirmEmail(body: ConfirmCode) {
  const { data } = await axiosInstance.post("/auth/confirmEmail/", body);
  return data;
}
