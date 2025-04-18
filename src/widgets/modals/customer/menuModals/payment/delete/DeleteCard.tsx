"use client";

import { usePaymentStore } from "@/entities/customer/payment/usePaymentStore";
import ModalsLayout from "@/layouts/modalLayout/layout";
import styles from "./deleteCard.module.css";
import { Button } from "@components/ui/button";
import React from "react";
import { useToast } from "@/hooks/use-toast";

const DeleteCard = ({
	onClose,
	onPrev,
}: {
	onClose: () => void;
	onPrev: () => void;
}) => {
	const { deleteCard, currentCard, isLoading, error } = usePaymentStore();
	const { toast } = useToast();

	if (!currentCard) {
		return null;
	}

	const handleDelete = async () => {
		try {
			await deleteCard(currentCard.id);
			toast({
				done: true,
				description: "Выбранный реквизит успешно удалён",
			});
			onClose();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<ModalsLayout
			title={`Удалим Visa ·· ${currentCard.cardId.toString().slice(-4)} через 30 дней`}
			back={onPrev}
			onClose={onClose}
		>
			<div className={styles.deleteModalWrapper}>
				<p>А пока скроем из способов оплаты</p>

				<div className={styles.actionButtons}>
					<Button
						variant="ghost"
						className={styles.cancelBtn}
						onClick={onPrev}
						disabled={isLoading}
					>
						Оставить
					</Button>

					<Button
						className={styles.submitButton}
						onClick={handleDelete}
						disabled={isLoading}
					>
						Удалить
					</Button>
				</div>
			</div>
		</ModalsLayout>
	);
};

export default DeleteCard;
