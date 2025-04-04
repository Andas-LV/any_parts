"use client";

import React from "react";
import styles from "./AdminProfile.module.css";
import { ChevronLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import PartnersSettingsDevices from "@/app/(pages)/partners/settings/(Tabs)/PartnersSettingsDevices/PartnersSettingsDevices";
import { useRouter } from "next/navigation";
import { AdminEditAccount } from "@/app/(pages)/admin/profile/AdminEditAccount/AdminEditAccount";

interface AdminProfile {}

export default function AdminProfile({}: AdminProfile) {
	const router = useRouter();

	return (
		<div className={styles.wrapper}>
			<h1 className={styles.header}>
				<ChevronLeft
					className="h-6 w-6 cursor-pointer"
					onClick={() => router.back()}
				/>
				Профиль
			</h1>

			<Tabs defaultValue="account" className={styles.tabsContainer}>
				<div className={styles.tabsListWrapper}>
					<TabsList className={styles.tabsList}>
						<TabsTrigger value="account" className={styles.tabsTrigger}>
							Учётная запись
						</TabsTrigger>
						<TabsTrigger value="devices" className={styles.tabsTrigger}>
							Ваши устройства
						</TabsTrigger>
					</TabsList>
				</div>

				<div className={styles.tabsContent}>
					<TabsContent value="account">
						<AdminEditAccount />
					</TabsContent>

					<TabsContent value="devices">
						<PartnersSettingsDevices />
					</TabsContent>
				</div>
			</Tabs>
		</div>
	);
}
