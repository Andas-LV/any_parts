"use client";

import styles from "./page.module.css";
import { useUserStore } from "@/entities/user/useUserStore";
import React, { useState } from "react";
import Payment from "@/widgets/modals/customer/menuModals/payment/Payment";
import Requisites from "@/widgets/modals/customer/menuModals/requisites/Requisites";
import SettingsModal from "@/widgets/modals/customer/menuModals/settings/settingsModal";
import Devices from "@/widgets/modals/customer/menuModals/devices/Devices";
import CreateCard from "@/widgets/modals/customer/menuModals/payment/create/CreateCard";
import DeleteCard from "@/widgets/modals/customer/menuModals/payment/delete/DeleteCard";
import CreateReq from "@/widgets/modals/customer/menuModals/requisites/create/CreateReq";
import ConfirmReqCodeModal from "@/widgets/modals/customer/menuModals/requisites/create/confirm";
import LogOutModal from "@/widgets/modals/customer/auth/logout/LogOut";
import EditModal from "@/widgets/modals/customer/account/edit/Edit";
import { Icons } from "@/assets/svg";

export type TPaymentModal =
	| "paymentModal"
	| "createPaymentModal"
	| "deletePaymentModal"
	| null;
type TReqModal = "reqModal" | "createReqModal" | "confirmReqModal" | null;

export default function Menu() {
	const { user } = useUserStore();

	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const [isDevicesOpen, setIsDevicesOpen] = useState(false);
	const [isLogOutOpen, setIsLogOutOpen] = useState(false);
	const [isEditModal, setIsEditModal] = useState(false);

	const [activePaymentModal, setActivePaymentModal] =
		useState<TPaymentModal>(null);
	const [activeReqModal, setActiveReqModal] = useState<TReqModal>(null);

	return (
		<div className={styles.wrapper}>
			<div
				className={styles.userInfo}
				onClick={() => {
					setIsEditModal(true);
				}}
				title="Редактировать"
			>
				<Icons.User width={48} height={48} />

				<h2>{user?.username}</h2>
			</div>

			<div className={styles.navs}>
				<p>Финансы</p>
				<button
					className={styles.navItem}
					onClick={() => setActivePaymentModal("paymentModal")}
				>
					<Icons.CreditCard width={20} height={20} />

					<p>Способы оплаты</p>
				</button>
				<button
					className={styles.navItem}
					onClick={() => setActiveReqModal("reqModal")}
				>
					<Icons.TextFile width={20} height={20} color={"black"} />

					<p>Реквизиты</p>
				</button>

				<p>Управление</p>
				<button
					className={styles.navItem}
					onClick={() => setIsSettingsOpen(true)}
				>
					<Icons.Settings width={20} height={20} />

					<p>Настройки</p>
				</button>
				<button
					className={styles.navItem}
					onClick={() => setIsDevicesOpen(true)}
				>
					<Icons.Devices width={20} height={20} />

					<p>Ваши устройства</p>
				</button>
				<button
					className={styles.navItem}
					onClick={() => setIsLogOutOpen(true)}
				>
					<Icons.Logout width={20} height={20} />

					<p>Выйти</p>
				</button>
			</div>

			{activePaymentModal === "paymentModal" && (
				<Payment
					onClose={() => setActivePaymentModal(null)}
					onCreate={() => setActivePaymentModal("createPaymentModal")}
					onDelete={() => setActivePaymentModal("deletePaymentModal")}
				/>
			)}

			{activePaymentModal === "createPaymentModal" && (
				<CreateCard
					onClose={() => setActivePaymentModal(null)}
					onPrev={() => setActivePaymentModal("paymentModal")}
				/>
			)}

			{activePaymentModal === "deletePaymentModal" && (
				<DeleteCard
					onClose={() => setActivePaymentModal(null)}
					onPrev={() => setActivePaymentModal("paymentModal")}
				/>
			)}
			{/*REQISITES*/}
			{activeReqModal === "reqModal" && (
				<Requisites
					onClose={() => setActiveReqModal(null)}
					onCreate={() => setActiveReqModal("createReqModal")}
				/>
			)}

			{activeReqModal === "createReqModal" && (
				<CreateReq
					onClose={() => setActiveReqModal(null)}
					onPrev={() => setActiveReqModal("reqModal")}
					onNext={() => setActiveReqModal("confirmReqModal")}
				/>
			)}

			{activeReqModal === "confirmReqModal" && (
				<ConfirmReqCodeModal
					onClose={() => setActiveReqModal(null)}
					onPrev={() => setActiveReqModal("createReqModal")}
				/>
			)}

			{/*SETTINGS && DEVICES*/}
			{isSettingsOpen && (
				<SettingsModal onClose={() => setIsSettingsOpen(false)} />
			)}
			{isDevicesOpen && <Devices onClose={() => setIsDevicesOpen(false)} />}

			{/*LOGOUT && EDIT*/}
			{isLogOutOpen && <LogOutModal onClose={() => setIsLogOutOpen(false)} />}
			{isEditModal && <EditModal onClose={() => setIsEditModal(false)} />}
		</div>
	);
}
