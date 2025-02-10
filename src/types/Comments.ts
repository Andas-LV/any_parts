import {User} from "@/types/User";

export type Comment = {
    id: number;
    user: User;
    rating: number;
    date: string;
    text: string;
    images?: string[];
    likes: number;
    replies?: Comment[];
    updatedAt?: string;
};
