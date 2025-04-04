"use client";

import styles from "./deliveryPoint.module.css";
import dynamic from "next/dynamic";
import React, { useMemo, useState } from "react";
import Loading from "@components/Loading";
import { Button } from "@components/ui/button";
import { useRouter } from "next/navigation";
import SearchBar from "@components/SearchBar/SearchBar";
import { DeliveryPoint } from "@/types/DeliveryPoint";
import DeliveryPointItem from "@components/cards/DeliveryPointItem/DeliveryPointItem";
import { filterBySearch } from "@/utils/filterBySearch";
import { allDeliveryPoints } from "@/exampleData/exampleDeliveryPoints";

export default function DeliveryPoints() {
	const OpenStreetMap = useMemo(
		() =>
			dynamic(() => import("@/components/OpenStreetMap"), {
				loading: () => <Loading />,
				ssr: false,
			}),
		[],
	);
	const router = useRouter();
	const [search, setSearch] = useState("");

	const filteredPoints = filterBySearch(allDeliveryPoints, search, ["address"]);

	return (
		<div className={styles.DeliveryPoints}>
			<div className={styles.navAddresses}>
				<Button
					onClick={() => router.back()}
					className={"p-0"}
					variant={"link"}
				>
					Вернуться назад
				</Button>
				<h1>Выбор пункта выдачи</h1>
				<SearchBar
					search={search}
					placeholder={"Поиск мест и адресов"}
					onSearchChange={(e) => setSearch(e.target.value)}
					width={"100%"}
				/>
				<div className={styles.deliveryPointItemWrapper}>
					{filteredPoints.map((point: DeliveryPoint) => (
						<div key={point.id} className={styles.deliveryPointItem}>
							<DeliveryPointItem point={point} />
						</div>
					))}
				</div>
			</div>

			<OpenStreetMap deliveryPoints={filteredPoints}  />
		</div>
	);
}
