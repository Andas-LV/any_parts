import { User } from "@/types/User";

export type Feedback = {
	id: number;
	user: User;
	rating: number;
	date: string;
	text: string;
	likedByMe: boolean;
	images?: string[];
	likes: number;
	replies?: Feedback[];
	updatedAt?: string;
};

export type TMyFeedbackCard = {
	id: number;
	shopName: string;
	productName: string;
	productImage: string;
	likedByMe: boolean;
	rating: number;
	text: string;
	likes: number;
	images?: string[];
};
