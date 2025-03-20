"use client";

import MainHeader from "@/components/Header/MainHeader/MainHeader";
import TopHeader from "@/components/Header/TopHeader/TopHeader";
import HeaderFilter from "@/components/Header/HeaderFilter/HeaderFilter";
import { useStickyHeader } from "@/hooks/useStickyHeader";
import styles from "./header.module.css";

export default function Header() {
	const showStickyHeader = useStickyHeader("fullHeader");

	return (
		<div>
			{showStickyHeader && (
				<div className={styles.stickyHeader}>
					<MainHeader />
				</div>
			)}

			<div id="fullHeader">
				<TopHeader />
				<MainHeader />
				<HeaderFilter />
			</div>
		</div>
	);
}
