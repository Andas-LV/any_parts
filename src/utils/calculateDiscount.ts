import { AP_DISCOUNT_PERCENTAGE } from "@/constants/apConstants";

export const calculateAPDiscount = (oldPrice: number) => {
	const discountedPrice = (oldPrice / 100) * AP_DISCOUNT_PERCENTAGE;
	return oldPrice - discountedPrice;
};

export const calculateDiscount = (
	originalPrice: number,
	discountPrice: number,
): number => {
	if (originalPrice === 0) return 0;
	const discountPercentage =
		((originalPrice - discountPrice) / originalPrice) * 100;
	return Math.round(discountPercentage * 10) / 10;
};
