import {TMyFeedbackCard} from "@/types/Feedbacks";
import axiosInstance from "@/lib/axiosInstance";

export async function createFeedback() {
    const { data } = await axiosInstance.post(`/user/me/create/feedback`);
    return data;
}

export async function getMyFeedbacks(): Promise<TMyFeedbackCard[]> {
    const { data } = await axiosInstance.get('/user/me/feedbacks/');
    return data;
}

export async function deleteMyFeedback(id: number) {
    const { data } = await axiosInstance.delete(`/user/me/feedbacks/${id}`);
    return data;
}


export async function getUnratedOrders() {
    const { data } = await axiosInstance.get('/getUnratedOrders/');
    return data;
}

export async function getQuestions() {
    const { data } = await axiosInstance.get('/getQuestions/');
    return data;
}
