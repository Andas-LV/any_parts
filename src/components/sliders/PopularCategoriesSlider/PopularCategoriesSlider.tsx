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
					<CarouselItem key={i} className={styles.categoryItem}>
						<img src={category.image} alt={category.name} className={styles.image}/>
						{category.name}
					</CarouselItem>
				))}
			</ReusableCarousel>
		</div>
	);
}
