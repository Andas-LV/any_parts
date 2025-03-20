import React from "react";
import styles from "./MainPage.module.css";
import { Button } from "@components/ui/button";
import MarketStatistics from "@/app/(pages)/partners/(Tabs)/MainPage/MarketStatistics/MarketStatistics";
import PartnerItemsList from "@/app/(pages)/partners/(Tabs)/MainPage/PartnerItemsList/PartnerItemsList";
import { useUserStore } from "@/entities/user/useUserStore";

export default function MainPage() {
	const { setActivePartnersTab } = useUserStore();

	return (
		<div className={styles.MainPage}>
			<MarketStatistics />
			<PartnerItemsList />
			<div className={styles.noContent}>
				<h3>Пока пусто</h3>
				<p>Здесь будет отображаться статистика вашего магазина</p>
				<Button
					className={styles.createItemBtn}
					onClick={() => {
						setActivePartnersTab("items");
					}}
				>
					Создать товар
				</Button>
			</div>
		</div>
	);
}
