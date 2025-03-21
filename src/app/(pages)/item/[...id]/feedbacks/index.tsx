"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import styles from "./comments.module.css";
import { ShowComments } from "./(Tabs)/showComments";
import { AskQuestion } from "./(Tabs)/askQuestion";
import { useItemsStore } from "@/entities/items/useItemsStore";
import React from "react";
import Loading from "@components/Loading";

export function Comments() {
	const { currentItem } = useItemsStore();

	if (!currentItem) {
		return <Loading />;
	}

	return (
		<div id="itemsTabs">
			<Tabs defaultValue="comments" className={styles.tabsContainer}>
				<div className={styles.tabsListWrapper}>
					<TabsList className={styles.tabsList}>
						<TabsTrigger value="comments" className={styles.tabsTrigger}>
							Отзывы
						</TabsTrigger>
						<TabsTrigger value="askQuestion" className={styles.tabsTrigger}>
							Задать вопрос
						</TabsTrigger>
					</TabsList>
				</div>

				<div className={styles.tabsContent}>
					<TabsContent value="comments">
						<ShowComments />
					</TabsContent>
					<TabsContent value="askQuestion">
						<AskQuestion />
					</TabsContent>
				</div>
			</Tabs>
		</div>
	);
}
