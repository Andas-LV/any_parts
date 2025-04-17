"use client";

import { useSession } from "next-auth/react"
import Banner from "@/components/Banner/Banner";
import { Items } from "@/widgets/Items";
import HeaderProvider from "@/layouts/HeaderProvider";
import BrandsSlider from "@components/sliders/BrandsSlider/BrandsSlider";
import PopularCategoriesSlider from "@components/sliders/PopularCategoriesSlider/PopularCategoriesSlider";
import { useUserStore } from "@/entities/user/useUserStore";
import { useEffect } from "react";

export default function Home() {
	// const { data: session, status} = useSession()
	const { fetchUser } = useUserStore();

	useEffect(() => {
		fetchUser();
	}, []);

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
