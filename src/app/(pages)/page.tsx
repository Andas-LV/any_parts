"use client";

import Banner from "@/components/Banner/Banner";
import { Items } from "@/widgets/Items";
import HeaderProvider from "@/layouts/HeaderProvider";

export default function Home() {
	return (
		<HeaderProvider>
			<div className="px-28">
				<Banner />
				<Items />
			</div>
		</HeaderProvider>
	);
}
