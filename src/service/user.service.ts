import axiosInstance from '@/lib/axiosInstance';
import { type User } from '@/types/User';
import {Session} from "@/types/Session";

export async function getUserMe(): Promise<User> {
    const { data } = await axiosInstance.get('/user/me/');
    return data;
}

export async function updateUserMe(body: Partial<User>): Promise<User> {
    const { data } = await axiosInstance.patch('/user/me/update/', body);
    return data;
}

export async function createApWallet() {
    const { data } = await axiosInstance.post('/user/create/apWallet/',);
    return data;
}

export async function uploadAvatar(avatarFile: File) {
    const formData = new FormData();
    formData.append('avatar', avatarFile);

    const { data } = await axiosInstance.patch('/user/me/avatar/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

    return data;
}

export async function getSessionDevices(): Promise<Session[]> {
    const { data } = await axiosInstance.get('/user/me/sessions/');
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