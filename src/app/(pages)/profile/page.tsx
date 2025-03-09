"use client";

import HeaderWrapper from "@/layouts/HeaderProvider";
import styles from "./profile.module.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import React from "react";
import Main from "./(Tabs)/Main";
import Favorite from "@/app/(pages)/profile/(Tabs)/Favorite";
import Refund from "@/app/(pages)/profile/(Tabs)/Refund";
import Orders from "@/app/(pages)/profile/(Tabs)/Orders";
import Purse from "@/app/(pages)/profile/(Tabs)/Purse";
import Feedback from "@/app/(pages)/profile/(Tabs)/Feedback";
import { useUserStore } from "@/entities/user/useUserStore";
import { TProfileTabs } from "@/types/Profile";

export default function Profile() {
	const { activeProfileTab, setActiveProfileTab } = useUserStore();

	return (
		<div>
			<HeaderWrapper>
				<div className={styles.wrapper}>
					<Tabs
						value={activeProfileTab}
						onValueChange={(value) =>
							setActiveProfileTab(value as TProfileTabs)
						}
						className={styles.tabsContainer}
					>
						<div className={styles.tabsListWrapper}>
							<TabsList className={`flex justify-between items-center mb-8`}>
								<TabsTrigger
									value="main"
									className={
										"text-gray-800 text-md px-0 data-[state=active]:text-primary font-bold"
									}
								>
									Главная
								</TabsTrigger>
								<TabsTrigger
									value="orders"
									className={
										"text-gray-800 text-md px-0 data-[state=active]:text-primary font-bold"
									}
								>
									Заказы
								</TabsTrigger>
								<TabsTrigger
									value="refund"
									className={
										"text-gray-800 text-md  px-0 data-[state=active]:text-primary font-bold"
									}
								>
									Возврат
								</TabsTrigger>
								<TabsTrigger
									value="favorite"
									className={
										"text-gray-800 text-md px-0 data-[state=active]:text-primary font-bold"
									}
								>
									Избранное
								</TabsTrigger>
								<TabsTrigger
									value="purse"
									className={
										"text-gray-800 text-md px-0 data-[state=active]:text-primary font-bold"
									}
								>
									AP кошелёк
								</TabsTrigger>
								<TabsTrigger
									value="feedback"
									className={
										"text-gray-800 text-md px-0 data-[state=active]:text-primary font-bold"
									}
								>
									Отзывы и вопросы
								</TabsTrigger>
							</TabsList>
						</div>

						<div className={styles.tabsContent}>
							<TabsContent value="main">
								<Main />
							</TabsContent>

							<TabsContent value="orders">
								<Orders />
							</TabsContent>

							<TabsContent value="refund">
								<Refund />
							</TabsContent>

							<TabsContent value="favorite">
								<Favorite />
							</TabsContent>

							<TabsContent value="purse">
								<Purse />
							</TabsContent>

							<TabsContent value="feedback">
								<Feedback />
							</TabsContent>
						</div>
					</Tabs>
				</div>
			</HeaderWrapper>
		</div>
	);
}
