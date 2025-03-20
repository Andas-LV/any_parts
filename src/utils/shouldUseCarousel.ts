export function shouldUseCarousel(
	images: string[],
	containerWidth: number,
): boolean {
	const imageWidth = 160;
	const gap = 20;
	const totalImagesWidth =
		images.length * imageWidth + (images.length - 1) * gap;
	return totalImagesWidth > containerWidth;
}
