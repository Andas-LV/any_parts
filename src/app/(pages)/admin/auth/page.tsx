"use client";

import React, { useState } from "react";
import styles from "./AdminAuth.module.css";
import { Icons } from "@/assets/svg/svg";
import AdminLoginModal from "@/widgets/modals/admin/auth/login/login";
import ForgotPasswordModal from "@/widgets/modals/admin/auth/forgotPassword/forgotPassword";
import AdminConfirmEmailModal from "@/widgets/modals/admin/auth/confirmEmail";
import NewPasswordModal from "@/widgets/modals/admin/auth/newPassword/newPassword";
import { useRouter } from "next/navigation";
import { routes } from "@/configs/routes";

export type TModal =
	| "login"
	| "forgotPassword"
	| "confirmCode"
	| "newPasswordModal"
	| null

export default function AdminAuth() {
	const router = useRouter();

	const [activeModal, setActiveModal] = useState<TModal>("login");

	const setNewPassword = () => {
		router.push(routes.admin());
		setActiveModal(null)
	}

	return (
		<div className={styles.AdminAuth}>
			<div className={styles.logo}>
				<Icons.Logo width={45} height={35} />
				<h1>Any Parts</h1>
				<span>Admin</span>
			</div>

			{activeModal === "login" && (
				<AdminLoginModal onForgotPassword={() => setActiveModal("forgotPassword")} />
			)}

			{activeModal === "forgotPassword" && (
				<ForgotPasswordModal
					onNext={() => setActiveModal("confirmCode")}
				/>
			)}

			{activeModal === "confirmCode" && (
				<AdminConfirmEmailModal
					onChangeEmail={() => setActiveModal("forgotPassword")}
					onNext={() => setActiveModal("newPasswordModal")}
				/>
			)}


			{activeModal === "newPasswordModal" && (
				<NewPasswordModal onNext={setNewPassword} />
			)}
		</div>
	);
}
