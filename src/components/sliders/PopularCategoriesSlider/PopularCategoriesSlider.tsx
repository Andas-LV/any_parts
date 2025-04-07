import React from "react";
import styles from "./PopularCategoriesSlider.module.css";
import { CarouselItem } from "@components/ui/carousel";
import ReusableCarousel from "@components/ui/ReusableCarousel";
import { popularCategories } from "@/exampleData/exampleCategories";

export default function PopularCategoriesSlider() {
	return (
		<div className={styles.PopularCategoriesSlider}>
			<h2>Популярные категории</h2>

			<ReusableCarousel slidesToScroll={1}>
				{popularCategories.map((category, i) => (
					<CarouselItem
						key={i}
						className="flex flex-col items-center gap-4
						flex-none font-bold rounded-[1rem] border
						border-gray-300 p-4
						shadow-[0_4px_10px_rgba(0,0,0,0.1)]
						cursor-pointer
						hover:shadow-[0_0_10px_rgba(0,0,0,0.3)]"
					>
						<img
							src={category.image}
							alt={category.name}
							className={styles.image}
						/>
						{category.name}
					</CarouselItem>
				))}
			</ReusableCarousel>
		</div>
	);
}
