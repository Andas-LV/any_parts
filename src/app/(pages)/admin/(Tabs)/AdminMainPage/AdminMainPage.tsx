import React from "react";
import styles from "./AdminMainPage.module.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import AnalyzeMarkets from "@/app/(pages)/admin/(Tabs)/AdminMainPage/(Tabs)/AnalyzeMarkets/AnalyzeMarkets";
import ShoppingStats from "@/app/(pages)/admin/(Tabs)/AdminMainPage/(Tabs)/ShoppingStats/ShoppingStats";

export default function AdminMainPage() {
	return (
		<div className={styles.AdminMainPage}>
			<h1 className={styles.h1}>Статистика Any Parts</h1>

			<Tabs
				defaultValue="analyze"
				className="h-full"
			>
				<TabsList className={styles.tabsList}>
					<TabsTrigger value="analyze" className={styles.tabsTrigger}>
						Анализ магазинов
					</TabsTrigger>

					<TabsTrigger value="shopping" className={styles.tabsTrigger}>
						Покупки товаров
					</TabsTrigger>
				</TabsList>

				<TabsContent value="analyze" className={styles.tabsContent}>
					<AnalyzeMarkets/>
				</TabsContent>

				<TabsContent value="shopping" className={styles.tabsContent}>
					<ShoppingStats/>
				</TabsContent>
			</Tabs>
		</div>
	);
}
