"use client";

import Banner from "@/components/Banner/Banner";
import { Items } from "@/widgets/Items";
import HeaderProvider from "@/layouts/HeaderProvider";
import BrandsSlider from "@components/sliders/BrandsSlider/BrandsSlider";
import PopularCategoriesSlider from "@components/sliders/PopularCategoriesSlider/PopularCategoriesSlider";

export default function Home() {
	return (
		<HeaderProvider>
			<div className="flex flex-col gap-8 px-28">
				<BrandsSlider />
				<Banner />
				<PopularCategoriesSlider />
				<Items />
			</div>
		</HeaderProvider>
	);
}
