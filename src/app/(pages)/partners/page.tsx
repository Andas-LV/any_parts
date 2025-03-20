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
import Promotion from "@/app/(pages)/partners/(Tabs)/Promotion/Promotion";
import { Button } from "@components/ui/button";
import { useState } from "react";
import PartnerItemsFeedbacks from "@/app/(pages)/partners/(Tabs)/PartnerItemsFeedbacks/PartnerItemsFeedbacks";
import PartnerItemsQuestions from "@/app/(pages)/partners/(Tabs)/PartnerItemsQuestions/PartnerItemsQuestions";

export type PartnersTabs = "main" | "items" | "progress" | "feedbacks";

export default function Page() {
	const { isModerated, activePartnersTab, setActivePartnersTab } =
		useUserStore();
	const [itemsTabView, setItemsTabView] = useState<"create" | "list">("create");
	const [feedbacksTabView, setFeedbacksTabView] = useState<
		"feedbacks" | "questions"
	>("feedbacks");

	return (
		<div className={styles.wrapper}>
			<PartnersHeader />

			<Tabs
				value={String(activePartnersTab)}
				onValueChange={(value) => setActivePartnersTab(value as PartnersTabs)}
				className="h-full"
			>
				<TabsList className={styles.tabsList}>
					<TabsTrigger value="main" className={styles.tabsTrigger}>
						Главная
					</TabsTrigger>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								className={`${styles.tabsTrigger} ${
									activePartnersTab === "items" ? styles.tabsTriggerActive : ""
								}`}
							>
								Товары
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem
								onClick={() => {
									setItemsTabView("list");
									setActivePartnersTab("items");
								}}
							>
								Список товаров
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => {
									setItemsTabView("create");
									setActivePartnersTab("items");
								}}
							>
								Добавить товар
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					<TabsTrigger value="progress" className={styles.tabsTrigger}>
						Продвижение
					</TabsTrigger>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								className={`${styles.tabsTrigger} ${
									activePartnersTab === "feedbacks"
										? styles.tabsTriggerActive
										: ""
								}`}
							>
								Отзывы и вопросы
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem
								onClick={() => {
									setFeedbacksTabView("feedbacks");
									setActivePartnersTab("feedbacks");
								}}
							>
								Отзывы покупателей
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => {
									setFeedbacksTabView("questions");
									setActivePartnersTab("feedbacks");
								}}
							>
								Вопросы пользователей
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
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

				<TabsContent value="feedbacks" className={styles.tabsContent}>
					{feedbacksTabView === "feedbacks" ? (
						<PartnerItemsFeedbacks />
					) : (
						<PartnerItemsQuestions />
					)}
				</TabsContent>
			</Tabs>
		</div>
	);
}
