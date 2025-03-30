"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import styles from "./settings.module.css";
import React from "react";
import PartnersSettingsAccount from "@/app/(pages)/partners/settings/(Tabs)/PartnersSettingsAccount/PartnersSettingsAccount";
import PartnersSettingsDevices from "@/app/(pages)/partners/settings/(Tabs)/PartnersSettingsDevices/PartnersSettingsDevices";
import PartnersTreatment from "@/app/(pages)/partners/settings/(Tabs)/PartnersTreatment/PartnersTreatment";
import PartnersSettingsNotifications from "@/app/(pages)/partners/settings/(Tabs)/PartnersSettingsNotifications/PartnersSettingsNotifications";
import { Icons } from "@/assets/svg/svg";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronLeft } from "lucide-react";

export default function PartnersSettings() {
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
						<TabsTrigger value="notifications" className={styles.tabsTrigger}>
							Мои уведомления
						</TabsTrigger>
						<TabsTrigger value="treatment" className={styles.tabsTrigger}>
							Договор
						</TabsTrigger>
					</TabsList>
				</div>

				<div className={styles.tabsContent}>
					<TabsContent value="account">
						<PartnersSettingsAccount />
					</TabsContent>

					<TabsContent value="devices">
						<PartnersSettingsDevices />
					</TabsContent>

					<TabsContent value="notifications">
						<PartnersSettingsNotifications />
					</TabsContent>

					<TabsContent value="treatment">
						<PartnersTreatment />
					</TabsContent>
				</div>
			</Tabs>
		</div>
	);
}
