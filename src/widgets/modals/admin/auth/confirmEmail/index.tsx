"use client";

import React, { useState } from "react";
import styles from "./confirmEmail.module.css";
import { Button } from "@components/ui/button";
import { renderError } from "@/utils/renderError";
import Timer, { useTimer } from "@/hooks/useTimer";
import { formatTime } from "@/utils/formatTime";
import PartnersModalLayout from "@/layouts/PartnersModalLayout/PartnersModalLayout";
import { useAdminAuthStore } from "@/entities/admin/auth/useAdminAuthStore";

interface AdminConfirmEmailModalProps {
	onNext: () => void;
	onChangeEmail: () => void;
}

const AdminConfirmEmailModal = ({
	onNext,
	onChangeEmail,
}: AdminConfirmEmailModalProps) => {
	const { confirmEmail, email, isLoading, error } = useAdminAuthStore();
	const [code, setCode] = useState("");
	const [canResend, setCanResend] = useState(false);
	const { reset: resetTimer } = useTimer(120, () => setCanResend(true));

	const handleResend = () => {
		setCanResend(false);
		resetTimer();
		// Add your resend logic here
	};

	const handleSubmit = async () => {
		if (email) {
			await confirmEmail({
				email: email,
				code: code,
			});
			onNext();
		}
	};

	return (
		<PartnersModalLayout title={"Подтверждение почты"}>
			<p className={styles.instruction}>
				Укажите проверочный код - он придёт на <span>{email}</span> <br />в
				течение 2 минут.
			</p>

			<input
				type="text"
				className={styles.codeInput}
				placeholder="Код активации"
				value={code}
				onChange={(e) => setCode(e.target.value)}
			/>

			{!canResend ? (
				<Timer
					initialTime={120}
					onComplete={() => setCanResend(true)}
					render={(timeLeft) => (
						<p className={styles.timerText}>
							Получить новый код можно через {formatTime(timeLeft)}
						</p>
					)}
				/>
			) : (
				<button className={styles.resendButton} onClick={handleResend}>
					Отправить код заново
				</button>
			)}

			{renderError(error, "code")}

			<div className={styles.buttonGroup}>
				<Button
					className={styles.submitButton}
					onClick={handleSubmit}
					disabled={isLoading}
				>
					Подтвердить
				</Button>

				<Button
					variant="ghost"
					className={styles.changeEmailButton}
					onClick={onChangeEmail}
					disabled={isLoading}
				>
					Изменить почту
				</Button>
			</div>
		</PartnersModalLayout>
	);
};

export default AdminConfirmEmailModal;
