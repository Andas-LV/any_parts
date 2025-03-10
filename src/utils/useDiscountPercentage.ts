export const useDiscountPercentage = (
	originalPrice: number,
	discountPrice: number,
): number => {
	if (originalPrice === 0) return 0;
	return ((originalPrice - discountPrice) / originalPrice) * 100;
};
