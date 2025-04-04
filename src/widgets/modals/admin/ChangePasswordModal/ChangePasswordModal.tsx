import React, { useState } from "react";
import styles from "./ChangePasswordModal.module.css";
import ModalsLayout from "@/layouts/modalLayout/layout";
import {TChangePassword} from "@/types/admin/Auth"
import { Button } from "@components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "@/schemas/account";
import { Eye, EyeOff } from "lucide-react";
import { useUserStore } from "@/entities/user/useUserStore";
import { changePassword } from "@/entities/user/user.service";

interface ChangePasswordModalProps {
	onClose: () => void;
}

export const ChangePasswordModal = ({ onClose }: ChangePasswordModalProps) => {
	const { changePassword } = useUserStore();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TChangePassword>({
		resolver: zodResolver(changePasswordSchema),
	});
	const [showPassword, setShowPassword] = useState(false);


	const onSubmit = async(data: TChangePassword) => {
		console.log("Данные формы:", data);
		await changePassword(data);
		onClose();
	};

	return (
		<ModalsLayout title="Смена пароля" onClose={onClose}>
			<div className={styles.ChangePasswordModal}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.inputWrapper}>
						<input
							type={showPassword ? "text" : "password"}
							className={styles.input}
							{...register("oldPassword")}
							placeholder="Текущий пароль"
						/>
						<button
							type="button"
							className={styles.passwordToggle}
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
						</button>
					</div>
					{errors.oldPassword && (
						<p className={styles.errorText}>{errors.oldPassword.message}</p>
					)}

					<div className={styles.inputWrapper}>
						<input
							type={showPassword ? "text" : "password"}
							className={styles.input}
							{...register("newPassword")}
							placeholder="Введите новый пароль"
						/>
						<button
							type="button"
							className={styles.passwordToggle}
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
						</button>
					</div>
					{errors.newPassword && (
						<p className={styles.errorText}>{errors.newPassword.message}</p>
					)}

					<div className={styles.inputWrapper}>
						<input
							type={showPassword ? "text" : "password"}
							className={styles.input}
							{...register("confirmPassword")}
							placeholder="Подтвердите новый пароль"
						/>
						<button
							type="button"
							className={styles.passwordToggle}
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
						</button>
					</div>

					{errors.confirmPassword && (
						<p className={styles.errorText}>{errors.confirmPassword.message}</p>
					)}

					<div className={styles.actionButtons}>
						<Button
							variant="secondary"
							className={styles.actionButton}
							onClick={onClose}
						>
							Отмена
						</Button>
						<Button type="submit" className={styles.actionButton}>
							Изменить
						</Button>
					</div>
				</form>
			</div>
		</ModalsLayout>
	);
};
