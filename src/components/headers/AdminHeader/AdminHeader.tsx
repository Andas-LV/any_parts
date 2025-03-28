"use client"

import React from "react";
import styles from "./AdminHeader.module.css";
import { Icons } from "@/assets/svg";
import { routes } from "@/configs/routes";
import { useRouter } from "next/navigation";

export default function AdminHeader() {
	const router = useRouter();

	return (
		<div className={styles.AdminHeader}>
			<div className={styles.logo}>
				<Icons.Logo width={45} height={35} />
				<h1>Any Parts</h1>
				<span>Admin</span>
			</div>

			<div className={"cursor-pointer"} onClick={() => router.push(routes.adminSettings())}>
				<Icons.User width={35} height={35} />
			</div>
		</div>
	);
}
