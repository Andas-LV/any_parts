import {Comment} from "@/types/Comments";
import {User} from "@/types/User";

export type Item = {
    id: number,
    name: string,
    price: number,
    currentPrice: number | null,
    discount: number | null,
    rating: number,
    comments: number,
    favorite: boolean,
    images: string[],
}

export type Images = {
    totalImages: number;
    image: {
        user: User,
        imageUrl: string
    }[]
}

export type ItemInfoType = {
    id: number,
    name: string,
    price: number,
    apPrice: number,
    currentPrice: number | null,
    discount: number | null,
    favorite: boolean,

    rating: number,
    ratingDistribution: RatingDistribution,

    comments: {
        amount: number;
        images: Images,
        list: Comment[];
    },
    images: string[],

    marketName: string,
    article: number,
    sold: number | null,
    options: string[],
    type: string[]
    brand: string,
    material: string,
    description: string,
}

export type RatingDistribution = {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
};