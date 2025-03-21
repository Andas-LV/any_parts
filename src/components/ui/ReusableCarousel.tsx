import React, { PropsWithChildren } from "react";
import {
	Carousel,
	CarouselContent,
	CarouselNext,
	CarouselPrevious,
} from "@components/ui/carousel";

interface ReusableCarouselProps {
	slidesToScroll?: number;
	align?: "start" | "center" | "end";
	className?: string;
}

export default function ReusableCarousel({
	children,
	slidesToScroll = 1,
	align = "start",
	className = "",
}: PropsWithChildren<ReusableCarouselProps>) {
	return (
		<Carousel
			opts={{
				align,
				slidesToScroll,
			}}
			className={`relative w-full mx-auto ${className}`}
		>
			<CarouselContent className="flex gap-4 px-4">{children}</CarouselContent>

			<CarouselPrevious
				className="
          bg-white
          border border-gray-200
          rounded-full
          w-10 h-10
          shadow-sm
          absolute
          top-1/2
          -translate-y-1/2
          z-10
          hover:bg-black hover:text-white
          -left-3
        "
			/>

			<CarouselNext
				className="
          bg-white
          border border-gray-200
          rounded-full
          w-10 h-10
          shadow-sm
          absolute
          top-1/2
          -translate-y-1/2
          z-10
          hover:bg-black hover:text-white
          -right-3
        "
			/>
		</Carousel>
	);
}
