"use client";

import ModalsLayout from "@/layouts/modalLayout/layout";
import { Payment } from "@/types/Payment";
import styles from "./logOut.module.css";
import { Button } from "@components/ui/button";
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/entities/customer/auth/useAuthStore";

const LogOutModal = ({ onClose }: { onClose: () => void }) => {
	const { logout, isLoading, error } = useAuthStore();
	const { toast } = useToast();

	const handleLogOut = async () => {
		try {
			await logout();
			toast({
				done: true,
				description: "Вы вышли из аккаунта",
			});
			onClose();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<ModalsLayout title={"Выйти из аккаунта"} onClose={onClose}>
			<div className={styles.logOutModelWrapper}>
				<p>
					Выходите? Мы всегда здесь, <br />
					когда вам понадобится нужная деталь!
				</p>

				<div className={styles.actionButtons}>
					<Button
						variant="ghost"
						className={styles.cancelBtn}
						onClick={onClose}
						disabled={isLoading}
					>
						Остаться
					</Button>

					<Button
						className={styles.submitButton}
						onClick={handleLogOut}
						disabled={isLoading}
					>
						Выйти
					</Button>
				</div>
			</div>
		</ModalsLayout>
	);
};

export default LogOutModal;
