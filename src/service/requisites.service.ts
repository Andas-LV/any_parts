import axiosInstance from '@/lib/axiosInstance';
import { Requisites, RequisiteValidator } from '@/types/Requisites';

export async function registerReq(body: RequisiteValidator) {
    const { data } = await axiosInstance.post('/requisites/register/', body);
    return data;
}

export async function deleteReq(id: number) {
    const { data } = await axiosInstance.delete(`/requisites/${id}delete/`,);
    return data;
}

export async function getReqs(): Promise<Requisites[]> {
    const { data } = await axiosInstance.get('/requisites/');
    return data;
}
