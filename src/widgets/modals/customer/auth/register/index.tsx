"use client";

import React from "react";
import styles from "./register.module.css";
import { Button } from "@components/ui/button";
import { renderError } from "@/utils/renderError";
import ModalsLayout from "@/layouts/modalLayout/layout";
import PartnersModalLayout from "@/layouts/PartnersModalLayout/PartnersModalLayout";

interface RegisterModalProps {
	email: string;
	username: string;
	setUsername: (value: string) => void;
	error: string | null;
	onSubmit: (e: React.FormEvent) => Promise<void>;
	onChangeEmail: () => void;
	back: () => void;
}

const RegisterModal = ({
	email,
	username,
	setUsername,
	error,
	onSubmit,
	onChangeEmail,
												 back,
}: RegisterModalProps) => {
	return (
		<PartnersModalLayout title={"Регистрация"} back={back}>
			<p className={styles.instruction}>
				Мы не нашли аккаунт, зарегистрированный на почту <br />
				<span className={styles.email}>{email}</span>
				<button className={styles.changeNumberBtn} onClick={onChangeEmail}>
					Изменить
				</button>
			</p>

			<p className={styles.instruction}>
				Чтобы создать новый аккаунт, введите своё имя и нажмите <br />
				кнопку «Зарегистрироваться»
			</p>

			<form onSubmit={onSubmit} className="flex flex-col gap-4">
				<input
					type="text"
					className={styles.nameInput}
					placeholder="Ваше имя"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>

				{renderError(error, "username")}

				<Button type="submit" className={styles.submitButton}>
					Зарегистрироваться
				</Button>
			</form>
		</PartnersModalLayout>
	);
};

export default RegisterModal;
