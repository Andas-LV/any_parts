import { ConfirmCode, Login, PartnerRegister } from "@/types/Auth";
import axiosInstance from "@/lib/axiosInstance";

export async function partnerRegister(body: PartnerRegister) {
  const { data } = await axiosInstance.post("/auth/partner/register/", body);
  return data;
}

export async function login(body: Login) {
  const { data } = await axiosInstance.post("/auth/partner/login/", body);
  return data;
}

export async function getConfirmCode(body: Login) {
  const { data } = await axiosInstance.post(
    "/auth/partner/getConfirmCode/",
    body,
  );
  return data;
}

export async function confirmEmail(body: ConfirmCode) {
  const { data } = await axiosInstance.post(
    "/auth/partner/confirmEmail/",
    body,
  );
  return data;
}
