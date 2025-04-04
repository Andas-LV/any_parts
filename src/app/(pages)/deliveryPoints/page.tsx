"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import Loading from "@components/Loading";

export default function DeliveryPoints() {
	const OpenStreetMap = useMemo(
		() =>
			dynamic(() => import("@/components/OpenStreetMap"), {
				loading: () => <Loading/>,
				ssr: false,
			}),
		[],
	);

	return <OpenStreetMap />;
}
