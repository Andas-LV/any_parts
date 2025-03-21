import React from "react";
import { CarouselItem } from "@components/ui/carousel";
import ReusableCarousel from "@components/ui/ReusableCarousel";
import { items } from "@/exampleData/exampleItems";
import ItemCard from "@components/cards/ItemCards/ItemCard/ItemCard";

export default function RecommendedCarousel() {
	return (
		<div className="flex flex-col gap-5 my-12">
			<h1 className="text-[24px] font-bold">Рекомендуем также</h1>

			<div className="w-full p-0">
				<ReusableCarousel slidesToScroll={1}>
					{items.map((item, index) => (
						<CarouselItem
							key={index}
							className="
                p-0
                flex-none
                basis-[calc(20%-12px)]
                max-[1400px]:basis-[calc(25%-12px)]
                max-[1100px]:basis-[calc(33.333%-12px)]
                max-[768px]:basis-[calc(50%-8px)]
                max-[480px]:basis-[calc(100%-15px)]
              "
						>
							<ItemCard item={item} showFavorite />
						</CarouselItem>
					))}
				</ReusableCarousel>
			</div>
		</div>
	);
}
