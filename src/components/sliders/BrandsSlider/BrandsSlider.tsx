import React from "react";
import styles from "./BrandsSlider.module.css";
import { CarouselItem } from "@components/ui/carousel";
import ReusableCarousel from "@components/ui/ReusableCarousel";
import { exampleBrands } from "@/exampleData/exampleFilters";

export default function BrandsSlider() {
	return (
		<div className={styles.BrandsSlider}>
			<ReusableCarousel slidesToScroll={3}>
				{exampleBrands.map((brand, i) => (
					<CarouselItem key={i} className={styles.brandItem}>
						{brand.label}
					</CarouselItem>
				))}
			</ReusableCarousel>
		</div>
	);
}
