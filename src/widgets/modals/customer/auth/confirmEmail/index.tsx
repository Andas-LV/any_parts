"use client";

import React, { useState } from "react";
import styles from "./confirmEmail.module.css";
import { Button } from "@components/ui/button";
import { renderError } from "@/utils/renderError";
import ModalsLayout from "@/layouts/modalLayout/layout";
import Timer, { useTimer } from "@/hooks/useTimer";
import { formatTime } from "@/utils/formatTime";
import PartnersModalLayout from "@/layouts/PartnersModalLayout/PartnersModalLayout";

interface ConfirmEmailModalProps {
	email: string;
	code: string;
	setCode: (value: string) => void;
	error: string | null;
	onSubmit: (e: React.FormEvent) => Promise<void>;
	onResend: () => Promise<void>;
	onChangeEmail: () => void;
	back: () => void;
}

const ConfirmEmailModal = ({
	email,
	code,
	setCode,
	error,
	onSubmit,
	onResend,
	onChangeEmail,
	back,
}: ConfirmEmailModalProps) => {
	const [canResend, setCanResend] = useState(false);
	const { reset: resetTimer } = useTimer(120, () => setCanResend(true));

	const handleResendClick = () => {
		setCanResend(false);
		resetTimer();
		onResend();
	};

	return (
		<PartnersModalLayout title={"Подтвердите почту"} back={back}>
			<p className={styles.instruction}>
				Укажите проверочный код - он придёт на <span>{email}</span> <br />в
				течение 2 минут.
			</p>
			<form onSubmit={onSubmit} className="flex flex-col gap-4">
				<input
					type="text"
					className={styles.codeInput}
					placeholder="Код из смс"
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
					<button
						type="button"
						className={styles.resendButton}
						onClick={handleResendClick}
					>
						Отправить код заново
					</button>
				)}

				{renderError(error, "code")}

				<div className={styles.buttonGroup}>
					<Button type="submit" className={styles.submitButton}>
						Подтвердить
					</Button>
					<Button
						variant="ghost"
						className={styles.changeEmailButton}
						onClick={onChangeEmail}
					>
						Изменить почту
					</Button>
				</div>
			</form>
		</PartnersModalLayout>
	);
};

export default ConfirmEmailModal;
