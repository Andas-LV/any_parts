"use client";

import PartnersHeader from "@components/PartnersHeader/PartnersHeader";
import styles from "./partnerPage.module.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import * as React from "react";
import CreateItem from "@/app/(pages)/partners/(Tabs)/CreateItem/CreateItem";
import SignUpPartner from "@/app/(pages)/partners/(Tabs)/SignUpPartner/SignUpPartner";
import { useUserStore } from "@/entities/user/useUserStore";
import MainPage from "@/app/(pages)/partners/(Tabs)/MainPage/MainPage";

export default function Page() {
	const { isModerated } = useUserStore();

	return (
		<div className={styles.wrapper}>
			<PartnersHeader />

			<Tabs defaultValue="main" className={"h-full"}>
				<TabsList className={styles.tabsList}>
					<TabsTrigger value="main" className={styles.tabsTrigger}>
						Главная
					</TabsTrigger>
					<TabsTrigger value="items" className={styles.tabsTrigger}>
						Товары
					</TabsTrigger>
					<TabsTrigger value="progress" className={styles.tabsTrigger}>
						Продвижение
					</TabsTrigger>
					<TabsTrigger value="feedback" className={styles.tabsTrigger}>
						Отзывы и вопросы
					</TabsTrigger>
				</TabsList>

				<TabsContent value="main" className={styles.tabsContent}>
					{isModerated ? <MainPage /> : <SignUpPartner />}
				</TabsContent>
				<TabsContent value="items" className={styles.tabsContent}>
					<CreateItem />
				</TabsContent>
				<TabsContent value="progress" className={styles.tabsContent}>
					<p>Контент для вкладки «Продвижение»</p>
				</TabsContent>
				<TabsContent value="feedback" className={styles.tabsContent}>
					<p>Контент для вкладки «Отзывы и вопросы»</p>
				</TabsContent>
			</Tabs>
		</div>
	);
}
