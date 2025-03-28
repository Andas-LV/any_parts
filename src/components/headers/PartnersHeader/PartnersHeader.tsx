"use client";

import React, { useState } from "react";
import styles from "./PartnersHeader.module.css";
import { Icons } from "@/assets/svg";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { routes } from "@/configs/routes";
import { useRouter } from "next/navigation";
import LogOutModal from "@/widgets/modals/customer/auth/logout/LogOut";

export default function PartnersHeader() {
	const router = useRouter();

	const [isMarketsList, setMarketsLists] = useState(false);
	const [isLogOutOpen, setIsLogOutOpen] = useState(false);

	return (
		<div className={styles.PartnersHeader}>
			<div className={styles.logo}>
				<Icons.Logo width={45} height={35} />
				<h1>Any Parts</h1>
				<span>Partners</span>
			</div>

			<div className={styles.navs}>
				<nav onClick={() => setMarketsLists(!isMarketsList)}>
					Название магазина
					<Icons.ArrowDown
						className={`${styles.arrowIcon} ${isMarketsList ? styles.rotated : ""}`}
					/>
				</nav>
				<nav>
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Icons.User width={30} height={30} />
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem
								onClick={() => router.push(routes.partnersSettings())}
							>
								<Icons.Settings width={20} height={20} />
								Настройки
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setIsLogOutOpen(true)}>
								<Icons.Logout width={20} height={20} />
								Выход
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</nav>
				<nav>
					<Icons.ChatDots width={30} height={30} />
				</nav>
			</div>

			{isLogOutOpen && <LogOutModal onClose={() => setIsLogOutOpen(false)} />}
		</div>
	);
}
