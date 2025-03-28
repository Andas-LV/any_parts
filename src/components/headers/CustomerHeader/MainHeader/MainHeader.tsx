"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Search from "./Search/Search";
import styles from "./mainHeader.module.css";
import LoginModal from "@/widgets/modals/customer/auth/login";
import CategoryFilter from "@components/CategoryPopup/CategoryFilter";
import { useAuthStore } from "@/entities/customer/auth/useAuthStore";
import { Icons } from "@/assets/svg";
import { useUserStore } from "@/entities/user/useUserStore";
import { TProfileTabs } from "@/app/(pages)/profile/page";
import { useRouter } from "next/navigation";
import { routes } from "@/configs/routes";

const MainHeader = () => {
	const { isAuthenticated } = useAuthStore();
	const { setActiveProfileTab, activeProfileTab } = useUserStore();

	const router = useRouter();
	const [isModalOpen, setModalOpen] = useState(false);

	const routeToProfileSection = (section: TProfileTabs) => {
		setActiveProfileTab(section);
		router.push(routes.profile());
	};

	return (
		<div className={styles.mainHeaderContainer}>
			<Link href="/" className={styles.logo}>
				<Icons.Logo width={45} height={35} />
				<h1>Any Parts</h1>
			</Link>

			<CategoryFilter />

			<Search />

			<nav className={styles.navigationSection}>
				{isAuthenticated ? (
					<div
						onClick={() => routeToProfileSection("main")}
						className={styles.navItem}
					>
						<Icons.User width={24} height={24} />
						<span>Профиль</span>
					</div>
				) : (
					<div className={styles.navItem} onClick={() => setModalOpen(true)}>
						<Icons.User width={24} height={24} />
						<span>Войти</span>
					</div>
				)}

				<div
					onClick={() => routeToProfileSection("orders")}
					className={styles.navItem}
				>
					<Image src="/header/order.svg" alt="Orders" width={24} height={24} />
					<span>Заказы</span>
				</div>

				<div
					onClick={() => routeToProfileSection("favorite")}
					className={styles.navItem}
				>
					<Image
						src="/header/favorite.svg"
						alt="Favorites"
						width={24}
						height={24}
					/>
					<span>Избранное</span>
				</div>

				<Link href="/basket" className={styles.navItem}>
					<Icons.Basket width={24} height={24} fill={"black"} />
					<span>Корзина</span>
				</Link>
			</nav>

			{isModalOpen && <LoginModal onClose={() => setModalOpen(false)} />}
		</div>
	);
};

export default MainHeader;
