import Image from "next/image";

export const renderThumbnail = (src: string, index: number) => {
	return (
		<Image src={src} alt={`Thumbnail ${index + 1}`} width={48} height={48} />
	);
};
