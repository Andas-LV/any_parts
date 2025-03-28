
import styles from './adminPage.module.css'
import AdminHeader from "@components/headers/AdminHeader/AdminHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import AdminMainPage from "@/app/(pages)/admin/(Tabs)/AdminMainPage/AdminMainPage";
import Markets from "@/app/(pages)/admin/(Tabs)/Markets/Markets";
import Announcements from "@/app/(pages)/admin/(Tabs)/Announcements/Announcements";
import Tariffs from "@/app/(pages)/admin/(Tabs)/Tariffs/Tariffs";

export default function AdminPage() {
	return(
		<div className={styles.wrapper}>
			<AdminHeader/>

			<Tabs
				defaultValue="main"
				className="h-full"
			>
				<TabsList className={styles.tabsList}>
					<TabsTrigger value="main" className={styles.tabsTrigger}>
						Главная
					</TabsTrigger>

					<TabsTrigger value="markets" className={styles.tabsTrigger}>
						Магазины
					</TabsTrigger>

					<TabsTrigger value="announcements" className={styles.tabsTrigger}>
						Объявления
					</TabsTrigger>

					<TabsTrigger value="tariffs" className={styles.tabsTrigger}>
						Тарифы продвижения
					</TabsTrigger>
				</TabsList>

				<TabsContent value="main" className={styles.tabsContent}>
					<AdminMainPage/>
				</TabsContent>

				<TabsContent value="markets" className={styles.tabsContent}>
					<Markets/>
				</TabsContent>

				<TabsContent value="announcements" className={styles.tabsContent}>
					<Announcements/>
				</TabsContent>

				<TabsContent value="tariffs" className={styles.tabsContent}>
					<Tariffs/>
				</TabsContent>
			</Tabs>
		</div>
	)
}
