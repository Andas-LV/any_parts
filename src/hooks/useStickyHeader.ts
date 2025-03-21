import { useState, useEffect, useLayoutEffect } from "react";

export function useStickyHeader(elementId: string) {
	const [isSticky, setIsSticky] = useState(false);

	useLayoutEffect(() => {
		const handleScroll = () => {
			const element = document.getElementById(elementId);
			if (element) {
				const elementBottom = element.getBoundingClientRect().bottom;
				setIsSticky(elementBottom <= 0);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [elementId]);

	return isSticky;
}
