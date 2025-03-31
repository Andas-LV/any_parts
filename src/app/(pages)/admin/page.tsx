"use client";

import styles from "./adminPage.module.css";
import AdminHeader from "@components/headers/AdminHeader/AdminHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import AdminMainPage from "@/app/(pages)/admin/(Tabs)/AdminMainPage/AdminMainPage";
import Markets from "@/app/(pages)/admin/(Tabs)/Markets/Markets";
import Announcements from "@/app/(pages)/admin/(Tabs)/Announcements/Announcements";
import Tariffs from "@/app/(pages)/admin/(Tabs)/Tariffs/Tariffs";
import Footer from "@components/Footer/Footer";
import React, { useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Button } from "@components/ui/button";
import MarketRequests from "@/app/(pages)/admin/(Tabs)/MarketRequests/MarketRequests";

type AdminTabs = "main" | "markets" | "announcements" | "tariffs";

export default function AdminPage() {
	const [marketsView, setMarketsView] = useState<"markets" | "requests">(
		"markets",
	);
	const [activeTab, setActiveTab] = useState<AdminTabs>("main");

	return (
		<div className={styles.wrapper}>
			<AdminHeader />

			<Tabs
				value={activeTab}
				onValueChange={(value) => setActiveTab(value as AdminTabs)}
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
									activeTab === "markets" ? styles.tabsTriggerActive : ""
								}`}
							>
								Магазины
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem
								onClick={() => {
									setMarketsView("markets");
									setActiveTab("markets");
								}}
							>
								Список магазинов
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => {
									setMarketsView("requests");
									setActiveTab("markets");
								}}
							>
								Входящие заявки
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					<TabsTrigger value="announcements" className={styles.tabsTrigger}>
						Объявления
					</TabsTrigger>

					<TabsTrigger value="tariffs" className={styles.tabsTrigger}>
						Тарифы продвижения
					</TabsTrigger>
				</TabsList>

				<TabsContent value="main" className={styles.tabsContent}>
					<AdminMainPage />
				</TabsContent>

				<TabsContent value="markets" className={styles.tabsContent}>
					{marketsView === "markets" ? <Markets /> : <MarketRequests />}
				</TabsContent>

				<TabsContent value="announcements" className={styles.tabsContent}>
					<Announcements />
				</TabsContent>

				<TabsContent value="tariffs" className={styles.tabsContent}>
					<Tariffs />
				</TabsContent>
			</Tabs>

			<Footer />
		</div>
	);
}
