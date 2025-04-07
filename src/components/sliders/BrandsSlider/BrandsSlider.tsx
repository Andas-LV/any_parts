import React from "react";
import { CarouselItem } from "@components/ui/carousel";
import ReusableCarousel from "@components/ui/ReusableCarousel";
import { exampleBrands } from "@/exampleData/exampleFilters";

export default function BrandsSlider() {
	return (
		<div className={"mt-4"}>
			<ReusableCarousel slidesToScroll={3}>
				{exampleBrands.map((brand, i) => (
					<CarouselItem
						key={i}
						className="flex-none bg-[var(--brand-gray)]
						py-3 px-4 rounded-[1rem] font-bold
						text-[14px] cursor-pointer
						hover:bg-[var(--skeleton)]"
					>
						{brand.label}
					</CarouselItem>
				))}
			</ReusableCarousel>
		</div>
	);
}
