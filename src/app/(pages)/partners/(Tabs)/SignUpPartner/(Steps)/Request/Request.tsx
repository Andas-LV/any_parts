"use client";

import React, { useEffect, useState } from "react";
import styles from "./Request.module.css";
import { Button } from "@components/ui/button";
import { usePartnersSignUpStore } from "@/entities/partners/fullSignUp/usePartnersSignUpStore";
import { useRouter } from "next/navigation";
import { routes } from "@/configs/routes";
import RequestSended from "@/widgets/modals/requestSended/requestSended";
import { useUserStore } from "@/entities/user/useUserStore";

interface RequestProps {
	previousStep?: () => void;
	isActive?: boolean;
}

export default function Request({ previousStep, isActive }: RequestProps) {
	const { setFullSignUp, fullSignUp } = usePartnersSignUpStore();
	const { setModeratedUser } = useUserStore();
	const router = useRouter();

	const [success, setSuccess] = useState(false);

	useEffect(() => {
		if (isActive) setFullSignUp();
	}, [isActive]);

	const createItem = async () => {
		try {
			// ЛОГИКА ЗАПРОСА
			console.log("fullSignUp", fullSignUp);
			await setModeratedUser(true);
			// router.push(routes.partners());
			setSuccess(true);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div className={styles.Request}>
			<div className={styles.text}>
				<h1>Отправьте заявку на проверку</h1>

				<p>
					Проверим данные в течение нескольких дней. Если всё в порядке, вы
					сможете заключить договор и начать продажи
				</p>
			</div>

			<div className={styles.actions}>
				<Button
					className={styles.button}
					variant={"secondary"}
					onClick={previousStep}
				>
					Назад
				</Button>

				<Button className={styles.button} onClick={createItem}>
					Отправить
				</Button>
			</div>

			{success && <RequestSended onClose={() => setSuccess(false)} />}
		</div>
	);
}
