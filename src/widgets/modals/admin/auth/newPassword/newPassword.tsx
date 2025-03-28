import React, { useState } from "react";
import styles from "./newPassword.module.css";
import { useAdminAuthStore } from "@/entities/admin/auth/useAdminAuthStore";
import PartnersModalLayout from "@/layouts/PartnersModalLayout/PartnersModalLayout";
import { renderError } from "@/utils/renderError";
import { Button } from "@components/ui/button";

interface NewPasswordModalProps {
	onNext: () => void;
}

export default function NewPasswordModal({ onNext }: NewPasswordModalProps) {
	const { refreshPassword, isLoading, error } = useAdminAuthStore();

	const [newPassword, setNewPassword] = useState("");
	const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

	const newPasswordForm = {
		newPassword: newPassword,
		newPasswordConfirm: newPasswordConfirm,
	};

	const handleSubmit = async () => {
		await refreshPassword(newPasswordForm);
		console.log(newPasswordForm);
		onNext()
	};

	return (
		<PartnersModalLayout title={"Новый пароль"}>
			<p>Введите новый пароль для доступа к аккаунту</p>

			<div className={styles.inputWrapper}>
				<input
					type="text"
					className={styles.input}
					placeholder="Новый пароль"
					value={newPassword}
					onChange={(e) => setNewPassword(e.target.value)}
				/>
			</div>

			{renderError(error, "email")}

			<div className={styles.inputWrapper}>
				<input
					type={"text"}
					className={styles.input}
					placeholder="Подтверждение нового пароля"
					value={newPasswordConfirm}
					onChange={(e) => setNewPasswordConfirm(e.target.value)}
				/>
			</div>

			{renderError(error, "password")}


			<Button
				disabled={isLoading}
				className={styles.submitButton}
				onClick={handleSubmit}
			>
				Обновить пароль
			</Button>
		</PartnersModalLayout>
	);
}
