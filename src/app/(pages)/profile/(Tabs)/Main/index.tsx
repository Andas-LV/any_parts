"use client";

import styles from "./page.module.css";
import Menu from "./menu";
import React, { useState } from "react";
import ApCreateModal from "@/widgets/modals/customer/apWallet/apCreateModal";
import { useUserStore } from "@/entities/user/useUserStore";
import AfterCreate from "@/widgets/modals/customer/apWallet/afterCreateWallet/afterCreate";
import InstructionModal from "@/widgets/modals/customer/apWallet/instruction/instructionModal";
import { Icons } from "@/assets/svg/svg";

export type TModal =
	| "createWallet"
	| "onSuccessModal"
	| "instructionModal"
	| null;

export default function Main() {
	const { user, currencySymbol } = useUserStore();

	const [activeModal, setActiveModal] = useState<TModal>(null);

	const itemsAmount = 0;

	return (
		<div className={styles.wrapper}>
			<Menu />

			<div className={styles.actionCards}>
				<div className={styles.actionCard}>
					<div className={styles.itemName}>
						<h2>0 {currencySymbol}</h2>
						<p>Баланс</p>
					</div>

					{user?.apWallet ? (
						<button className={styles.createWalletButton}>
							<Icons.Wallet />

							<p>Пополнить</p>
						</button>
					) : (
						<button
							className={styles.createWalletButton}
							onClick={() => setActiveModal("createWallet")}
						>
							<Icons.Wallet />

							<p>Открыть AP Кошелёк</p>
						</button>
					)}
				</div>

				<div className={styles.actionCard}>
					<div className={styles.itemName}>
						<h2>Избранное</h2>
						<p>{itemsAmount} товаров</p>
					</div>

					<button className={styles.favoriteButton}>
						<Icons.HeartFilled width={20} height={20} />
					</button>
				</div>

				<div className={styles.actionCard}>
					<div className={styles.itemName}>
						<h2>Покупки</h2>
						<p>Пока пусто</p>
					</div>

					<button className={styles.bagButton}>
						<Icons.Bag width={30} height={30} />
					</button>
				</div>
			</div>

			{activeModal === "createWallet" && (
				<ApCreateModal
					onClose={() => setActiveModal(null)}
					onNext={() => setActiveModal("onSuccessModal")}
				/>
			)}
			{activeModal === "onSuccessModal" && (
				<AfterCreate
					onClose={() => setActiveModal(null)}
					onNext={() => setActiveModal("instructionModal")}
				/>
			)}
			{activeModal === "instructionModal" && (
				<InstructionModal onClose={() => setActiveModal(null)} />
			)}
		</div>
	);
}
