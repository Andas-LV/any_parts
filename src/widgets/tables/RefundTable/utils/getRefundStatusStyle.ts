import { TRefundStatus } from "@/types/Refund";
import styles from "@/app/(pages)/profile/(Tabs)/Refund/page.module.css";

export const getRefundStatusStyle = (status: TRefundStatus) => {
	switch (status) {
		case "Одобрено":
			return styles.statusApproved;
		case "Не одобрено":
			return styles.statusRejected;
		default:
			return styles.statusPending;
	}
};
