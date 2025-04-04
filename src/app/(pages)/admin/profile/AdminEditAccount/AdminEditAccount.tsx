import React, { useState } from "react";
import styles from "./AdminEditAccount.module.css";
import { useUserStore } from "@/entities/user/useUserStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminEmailSchema } from "@/schemas/account";
import { z } from "zod";
import { Button } from "@components/ui/button";
import { Icons } from "@/assets/svg/svg";
import LogOutModal from "@/widgets/modals/customer/auth/logout/LogOut";
import { ChangePasswordModal } from "@/widgets/modals/admin/ChangePasswordModal/ChangePasswordModal";

interface AdminEditAccountProps {}

export const AdminEditAccount = ({}: AdminEditAccountProps) => {
	const { user, updateUser } = useUserStore();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(adminEmailSchema),
		defaultValues: {
			email: user?.email ?? "",
		},
	});

	const [isEmailDisabled, setIsEmailDisabled] = useState(true);
	const [changePassword, setChangePassword] = useState(false);
	const [isLogOutOpen, setIsLogOutOpen] = useState(false);

	const onError = (formErrors: any) => {
		console.log("Ошибки от zod:", formErrors);
	};

	const onSubmitEmail = async (data: z.infer<typeof adminEmailSchema>) => {
		await updateUser({ email: data.email });
		setIsEmailDisabled(true);
	};

	return (
		<div className={styles.AdminEditAccount}>
			<div className={styles.inputGroup}>
				<label htmlFor="email" className={styles.label}>
					Имя пользователя
				</label>
				<div className={styles.fieldWithButton}>
					<input
						id="username"
						type="text"
						placeholder="Введите имя пользователя"
						{...register("email")}
						className={styles.input}
						disabled={isEmailDisabled}
					/>
					{isEmailDisabled ? (
						<Button
							variant="link"
							className="p-0"
							onClick={() => setIsEmailDisabled(false)}
						>
							Изменить
						</Button>
					) : (
						<Button
							variant="link"
							className="p-0"
							onClick={handleSubmit(onSubmitEmail, onError)}
						>
							Сохранить
						</Button>
					)}
				</div>
				{errors.email && (
					<p className={styles.errorText}>{errors.email.message}</p>
				)}
			</div>

			<div className={styles.inputGroup}>
				<label htmlFor="password" className={styles.label}>
					Пароль
				</label>
				<div className={styles.fieldWithButton}>
					<input
						id="password"
						type="password"
						placeholder="password"
						className={styles.input}
						disabled={!changePassword}
					/>
					<Button
						variant="link"
						className="p-0"
						onClick={() => setChangePassword(true)}
					>
						Изменить
					</Button>
				</div>
			</div>

			<Button
				className={"w-fit p-5 rounded-xl"}
				variant={"outline"}
				onClick={() => setIsLogOutOpen(true)}
			>
				<Icons.Logout width={20} height={20} />
				Выйти из аккаунта
			</Button>

			{isLogOutOpen && <LogOutModal onClose={() => setIsLogOutOpen(false)} />}
			{changePassword && (
				<ChangePasswordModal onClose={() => setChangePassword(false)} />
			)}
		</div>
	);
}
