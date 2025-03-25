import { useLayoutEffect } from "react";

export default function useBodyOverflow(isOpen: boolean) {
	useLayoutEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}

		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);
}
