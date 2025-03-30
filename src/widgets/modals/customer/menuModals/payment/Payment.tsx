"use client";

import styles from "./payment.module.css";
import { Icons } from "@/assets/svg/svg";
import PaymentCard from "@components/cards/PaymentCards";
import ModalsLayout from "@/layouts/modalLayout/layout";
import React from "react";

const Payment = ({
	onClose,
	onCreate,
	onDelete,
}: {
	onClose: () => void;
	onCreate: () => void;
	onDelete: () => void;
}) => {
	return (
		<ModalsLayout title="Способ оплаты" onClose={onClose}>
			<PaymentCard onDelete={onDelete} />

			<button className={styles.navItem} onClick={onCreate}>
				<div className={styles.navHeader}>
					<Icons.CreditCard width={20} height={20} />
					<p>Привязать карту</p>
				</div>
				<Icons.ArrowRight />
			</button>

			<button className={styles.navItem}>
				<div className={styles.navHeader}>
					<Icons.CreditCard width={20} height={20} />
					<p>Привязать счёт (к примеру СБП)</p>
				</div>
				<Icons.ArrowRight />
			</button>
		</ModalsLayout>
	);
};

export default Payment;
