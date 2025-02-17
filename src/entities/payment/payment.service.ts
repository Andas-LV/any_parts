import axiosInstance from '@/lib/axiosInstance';
import { Payment, PaymentCardValidator } from '@/types/Payment';

export async function registerCard(body: PaymentCardValidator) {
    const { data } = await axiosInstance.post('/card/register/', body);
    return data;
}

export async function deleteCard(id: number) {
    const { data } = await axiosInstance.delete(`/card/${id}delete/`,);
    return data;
}

export async function getCard(): Promise<Payment[]> {
    const { data } = await axiosInstance.get('/card/');
    return data;
}
