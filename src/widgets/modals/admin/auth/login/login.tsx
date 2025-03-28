"use client";

import styles from "./login.module.css";
import React, { useState } from "react";
import { Button } from "@components/ui/button";
import { Checkbox } from "@components/ui/checkbox";
import { Label } from "@components/ui/label";
import { renderError } from "@/utils/renderError";
import PartnersModalLayout from "@/layouts/PartnersModalLayout/PartnersModalLayout";
import { useAdminAuthStore } from "@/entities/admin/auth/useAdminAuthStore";
import { Eye, EyeOff } from "lucide-react";
import { routes } from "@/configs/routes";
import { useRouter } from "next/navigation";

interface PartnerLoginModalProps {
	onForgotPassword: () => void;
}

const AdminLoginModal = ({
	onForgotPassword,
}: PartnerLoginModalProps) => {
	const { login, isLoading, error } = useAdminAuthStore();
	const router = useRouter();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rememberMe, setRememberMe] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const loginForm = {
		email: email,
		password: password,
		rememberMe: rememberMe,
	};

	const handleSubmit = async () => {
		await login(loginForm);
		console.log(loginForm);
		router.push(routes.admin());
	};

	return (
		<PartnersModalLayout title={"Вход в панель администратора"}>
			<div className={styles.inputWrapper}>
				<input
					type="text"
					className={styles.input}
					placeholder="Почта"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>

			{renderError(error, "email")}

			<div className={styles.inputWrapper}>
				<input
					type={showPassword ? "text" : "password"}
					className={styles.input}
					placeholder="Пароль"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button
					type="button"
					className={styles.passwordToggle}
					onClick={() => setShowPassword(!showPassword)}
				>
					{showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
				</button>
			</div>

			{renderError(error, "password")}

			<div className={styles.underForm}>
				<div className={styles.checkbox}>
					<Checkbox
						id="rememberMe"
						checked={rememberMe}
						onClick={() => setRememberMe(!rememberMe)}
					/>
					<Label htmlFor="rememberMe" className={styles.rememberMe}>
						Запомнить меня
					</Label>
				</div>

				<Button onClick={() => (onForgotPassword())} variant={"link"} className={"p-0"}>
					Забыли пароль?
				</Button>
			</div>

			<Button
				disabled={isLoading}
				className={styles.submitButton}
				onClick={handleSubmit}
			>
				Войти
			</Button>
		</PartnersModalLayout>
	);
};

export default AdminLoginModal;
