"use client";

import MainHeader from "./MainHeader/MainHeader";
import TopHeader from "./TopHeader/TopHeader";
import HeaderFilter from "./HeaderFilter/HeaderFilter";
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
