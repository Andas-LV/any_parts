"use client";

import PartnersHeader from "@components/PartnersHeader/PartnersHeader";
import styles from "./partnerPage.module.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import CreateItem from "@/app/(pages)/partners/(Tabs)/CreateItem/CreateItem";
import SignUpPartner from "@/app/(pages)/partners/(Tabs)/SignUpPartner/SignUpPartner";
import { useUserStore } from "@/entities/user/useUserStore";
import MainPage from "@/app/(pages)/partners/(Tabs)/MainPage/MainPage";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import ItemsLists from "@/app/(pages)/partners/(Tabs)/ItemsLists/ItemsLists";
import { Button } from "@components/ui/button";
import { useState } from "react";
import Promotion from "@/app/(pages)/partners/(Tabs)/Promotion/Promotion";

export default function Page() {
	const { isModerated } = useUserStore();
	const [activeTab, setActiveTab] = useState("main");
	const [itemsTabView, setItemsTabView] = useState<"create" | "list">("list");

	return (
		<div className={styles.wrapper}>
			<PartnersHeader />

			<Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
				<TabsList className={styles.tabsList}>
					<TabsTrigger value="main" className={styles.tabsTrigger}>
						Главная
					</TabsTrigger>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								className={`${styles.tabsTrigger} ${
									activeTab === "items" ? styles.tabsTriggerActive : ""
								}`}
							>
								Товары
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem
								onClick={() => {
									setItemsTabView("list");
									setActiveTab("items");
								}}
							>
								Список товаров
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => {
									setItemsTabView("create");
									setActiveTab("items");
								}}
							>
								Добавить товар
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

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
					{itemsTabView === "create" ? <CreateItem /> : <ItemsLists />}
				</TabsContent>

				<TabsContent value="progress" className={styles.tabsContent}>
					<Promotion />
				</TabsContent>

				<TabsContent value="feedback" className={styles.tabsContent}>
					<p>Контент для вкладки «Отзывы и вопросы»</p>
				</TabsContent>
			</Tabs>
		</div>
	);
}
