import { StatusTypes } from "@/types/Refund";
import styles from "@/app/(pages)/profile/(Tabs)/Refund/page.module.css";

export const getRefundStatusStyle = (status: StatusTypes) => {
	switch (status) {
		case "Одобрено":
			return styles.statusApproved;
		case "Не одобрено":
			return styles.statusRejected;
		default:
			return styles.statusPending;
	}
};
