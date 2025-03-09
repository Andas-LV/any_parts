"use client";

import MainHeader from "@/components/Header/MainHeader/MainHeader";
import TopHeader from "@/components/Header/TopHeader/TopHeader";
import HeaderFilter from "@/components/Header/HeaderFilter/HeaderFilter";
import { useEffect, useState } from "react";
import styles from "./header.module.css";

export default function Header() {
	const [isMainHeaderFixed, setIsMainHeaderFixed] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const headerElement = document.getElementById("fullHeader");
			if (headerElement) {
				const headerBottom = headerElement.getBoundingClientRect().bottom;
				setIsMainHeaderFixed(headerBottom <= 0);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div id="fullHeader">
			<TopHeader />
			<div
				className={`${styles.mainHeaderWrapper} ${isMainHeaderFixed ? styles.fixed : ""}`}
			>
				<MainHeader />
			</div>
			<HeaderFilter />
		</div>
	);
}
