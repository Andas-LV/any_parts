"use client";

import styles from "./paymentBlock.module.css";
import { Checkbox } from "@components/ui/checkbox";
import React, { useState } from "react";
import { useBasketStore } from "@/entities/customer/basket/useBasketStore";
import { Icons } from "@/assets/svg/svg";
import BasketShareModal from "@/widgets/modals/customer/basketShareModal/BasketShareModal";
import PaymentCard from "../../../../components/cards/PaymentCards";
import Image from "next/image";
import { usePaymentStore } from "@/entities/customer/payment/usePaymentStore";
import CreateCard from "@/widgets/modals/customer/menuModals/payment/create/CreateCard";
import DeleteCard from "@/widgets/modals/customer/menuModals/payment/create/CreateCard";
import { TPaymentModal } from "@/app/(pages)/profile/(Tabs)/Main/menu";

export default function PaymentBlock() {
	const { deleteCard } = usePaymentStore();

	const [activePaymentModal, setActivePaymentModal] =
		useState<TPaymentModal>(null);

	return (
		<div className={styles.wrapper}>
			<h1>Способ оплаты</h1>

			<PaymentCard
				onDelete={() => setActivePaymentModal("deletePaymentModal")}
			/>

			<div className={styles.actions}>
				<button
					className={styles.navItem}
					onClick={() => setActivePaymentModal("createPaymentModal")}
				>
					<div className={styles.navHeader}>
						<Image
							className={styles.navImage}
							src={"/profile/CreditCard.png"}
							alt="navImage"
							fill
							sizes={"20px"}
						/>
						<p>Привязать карту</p>
					</div>
					<Icons.ArrowRight />
				</button>

				<button className={styles.navItem}>
					<div className={styles.navHeader}>
						<Image
							className={styles.navImage}
							src={"/profile/CreditCard.png"}
							alt="navImage"
							fill
							sizes={"20px"}
						/>
						<p>Привязать счёт (к примеру СБП)</p>
					</div>
					<Icons.ArrowRight />
				</button>
			</div>

			{activePaymentModal === "createPaymentModal" && (
				<CreateCard
					onClose={() => setActivePaymentModal(null)}
					onPrev={() => setActivePaymentModal(null)}
				/>
			)}

			{activePaymentModal === "deletePaymentModal" && (
				<DeleteCard
					onClose={() => setActivePaymentModal(null)}
					onPrev={() => setActivePaymentModal(null)}
				/>
			)}
		</div>
	);
}
