import { Feedback } from "@/types/Feedbacks";
import { User } from "@/types/User";

export type ItemCardType = {
	id: number;
	name: string;
	price: number;
	currentPrice: number | null;
	discount: number | null;
	rating: number;
	comments: number;
	favorite: boolean;
	images: string[];
};

export type ItemInfoType = {
	id: number;
	name: string;
	price: number;
	apPrice: number;
	currentPrice: number | null;
	discount: number | null;
	favorite: boolean;

	rating: number;
	ratingDistribution: RatingDistribution;

	comments: Comments;
	images: string[];

	marketName: string;
	article: number;
	sold: number | null;
	options: string[];
	type: string[];
	brand: string;
	material: string;
	description: string;
};

export type TFilteredItemInfo = {
	id: number;
	name: string;
	price: number;
	apPrice?: number;
	currentPrice: number | null;
	discount: number | null;
	rating: number;
	comments: number;
	favorite: boolean;
	images: string[];
	marketName: string;

	autoType: AutoType;
	color: string;
	itemType: string;
	brand: string;
	material: string;
	description: string;
};

export type AutoType = {
	id: number;
	brand: string;
	model: string;
	generation: string;
	manuFacturer: string;
};

export type Comments = {
	amount: number;
	images: feedbackImages;
	list: Feedback[];
};

export type feedbackImages = {
	totalImages: number;
	image: {
		user: User;
		imageUrl: string;
	}[];
};

export type RatingDistribution = {
	1: number;
	2: number;
	3: number;
	4: number;
	5: number;
};
