"use client";

import React, { useEffect } from "react";
import styles from "./Preview.module.css";
import { Button } from "@components/ui/button";
import { useCreateItemStore } from "@/entities/partners/createItem/useCreateItemStore";
import PreviewItem from "@/widgets/PreviewItem/PreviewItem";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { routes } from "@/configs/routes";

interface PreviewProps {
	previousStep?: () => void;
	isActive?: boolean;
}

export default function Preview({ previousStep, isActive }: PreviewProps) {
	const { setFullInfo, fullInfo } = useCreateItemStore();
	const { toast } = useToast();
	const router = useRouter();

	useEffect(() => {
		if (isActive) setFullInfo();
	}, [isActive]);

	const createItem = () => {
		router.push(routes.partners());
		toast({
			done: true,
			title: "Товар успешно создан!",
			description:
				"Ваш товар добавлен в каталог. Теперь его могут увидеть покупатели",
		});
	};

	return (
		<div className={styles.Preview}>
			<h1>Предварительный просмотр</h1>
			<PreviewItem />

			<div className={styles.actions}>
				<Button
					className={styles.button}
					variant={"secondary"}
					onClick={previousStep}
				>
					Назад
				</Button>

				<Button className={styles.button} onClick={createItem}>
					Отправить запрос на создание товара
				</Button>
			</div>
		</div>
	);
}
