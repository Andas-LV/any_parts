export const calculateDiscountPercentage = (
	originalPrice: number,
	discountPrice: number,
): number => {
	if (originalPrice === 0) return 0;
	const discountPercentage =
		((originalPrice - discountPrice) / originalPrice) * 100;
	return Math.round(discountPercentage * 10) / 10;
};
