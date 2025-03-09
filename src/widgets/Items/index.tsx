"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@components/ui/tabs";
import styles from "./items.module.css";
import Discounted from "@/widgets/Items/(Tabs)/Discounted/Discounted";
import Recommended from "@/widgets/Items/(Tabs)/Recommended/Recommended";
import Popular from "@/widgets/Items/(Tabs)/Popular/Popular";

export function Items() {
	return (
		<div>
			<Tabs defaultValue="sale" className={styles.tabsContainer}>
				<div className={styles.tabsListWrapper}>
					<TabsList className={styles.tabsList}>
						<TabsTrigger value="sale" className={styles.tabsTrigger}>
							Распродажа
						</TabsTrigger>
						<TabsTrigger value="recommended" className={styles.tabsTrigger}>
							Рекомендуем вам
						</TabsTrigger>
						<TabsTrigger value="popular" className={styles.tabsTrigger}>
							Популярные товары
						</TabsTrigger>
					</TabsList>
				</div>

				<div className={styles.tabsContent}>
					<TabsContent value="sale">
						<Discounted />
					</TabsContent>
					<TabsContent value="recommended">
						<Recommended />
					</TabsContent>
					<TabsContent value="popular">
						<Popular />
					</TabsContent>
				</div>
			</Tabs>
		</div>
	);
}
