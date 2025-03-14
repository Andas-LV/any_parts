"use client";

import React, { useState } from "react";
import styles from "./PartnersHeader.module.css";
import { Icons } from "@/assets/svg";

interface PartnersHeaderProps {}

export default function PartnersHeader() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className={styles.PartnersHeader}>
			<div className={styles.logo}>
				<Icons.Logo width={45} height={35} />
				<h1>Any Parts</h1>
				<span>Partners</span>
			</div>

			<div className={styles.navs}>
				<nav onClick={() => setIsOpen(!isOpen)}>
					Название магазина
					<Icons.ArrowDown
						className={`${styles.arrowIcon} ${isOpen ? styles.rotated : ""}`}
					/>
				</nav>
				<nav>
					<Icons.User width={30} height={30} />
				</nav>
				<nav>
					<Icons.ChatDots width={30} height={30} />
				</nav>
			</div>
		</div>
	);
}
