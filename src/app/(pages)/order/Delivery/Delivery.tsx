"use client";

import styles from "./Delivery.module.css";
import { useUserStore } from "@/entities/user/useUserStore";
import { Icons } from "@/assets/svg";
import { Button } from "@components/ui/button";
import React, { useState } from "react";
import { useOrdersStore } from "@/entities/orders/useOrdersStore";
import { HOLDING_DAYS } from "@/constants/item";
import EditModal from "@/widgets/modals/auth/edit/Edit";

export default function Delivery() {
	const { user } = useUserStore();
	const { orders } = useOrdersStore();

	const [isEditModal, setIsEditModal] = useState(false);

	return (
		<div className={styles.wrapper}>
			<h1>Параметры получения</h1>

			<div className={styles.addressWrapper}>
				<div className={styles.address}>
					<div className={styles.detailWrapper}>
						<Icons.Location width={20} height={20} />
						<div className={styles.detailInfo}>
							<div className={styles.label}>Пункт выдачи товаров Any Parts</div>
							<div className={styles.value}>{orders && orders[0].address}</div>
						</div>
					</div>

					<Button variant="link" className={styles.link}>
						Изменить
					</Button>
				</div>

				<p>Срок хранения заказа — {HOLDING_DAYS} дней</p>
			</div>

			<div
				className={styles.userInfo}
				onClick={() => {
					setIsEditModal(true);
				}}
				title="Редактировать"
			>
				<Icons.User width={30} height={30} />

				<h2>{user?.username}</h2>

				<h2>{user?.phone}</h2>

				<Icons.ArrowRight />
			</div>

			{isEditModal && <EditModal onClose={() => setIsEditModal(false)} />}
		</div>
	);
}
