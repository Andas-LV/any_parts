"use client";

import Image from "next/image";
import Link from "next/link";
import Search from "./Search/Search";
import styles from "./mainHeader.module.css";
import CategoryFilter from "@components/CategoryPopup/CategoryFilter";
import { useAuthStore } from "@/entities/customer/auth/useAuthStore";
import { Icons } from "@/assets/svg/svg";
import { useUserStore } from "@/entities/user/useUserStore";
import { TProfileTabs } from "@/app/(pages)/profile/page";
import { useRouter } from "next/navigation";
import { routes } from "@/configs/routes";
import { useSession } from "next-auth/react";
import { useState } from "react";
import LoginPage from "@/app/(pages)/login/page";

const MainHeader = () => {
	const { isAuthenticated } = useAuthStore();
	// const { data: session, status} = useSession();
	const { setActiveProfileTab } = useUserStore();
	const [login, setLogin] = useState(false);

	const router = useRouter();

	const routeToProfileSection = (section: TProfileTabs) => {
		setActiveProfileTab(section);
		router.push(routes.profile());
	};

	const handleLogin = () => {
		// setLogin(true);
		router.push(routes.login());
	}

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
					<div className={styles.navItem} onClick={handleLogin}>
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

			{/*{login && <LoginPage/>}*/}
		</div>
	);
};

export default MainHeader;
