import React from "react";
import styles from "./DeleteItemModal.module.css";
import ModalsLayout from "@/layouts/modalLayout/layout";
import { Button } from "@components/ui/button";
import { useAdminItemsStore } from "@/entities/admin/items/useAdminItemsStore";
import { useToast } from "@/hooks/use-toast";

interface DeleteItemModalProps {
	itemId: number;
	onClose: () => void;
}

export default function DeleteItemModal({
	itemId,
	onClose,
}: DeleteItemModalProps) {
	const { removeItem } = useAdminItemsStore();
	const { toast } = useToast();

	const handleDeleteItem = () => {
		try {
			removeItem(itemId);
			toast({
				done: true,
				description: "Товар удалён с площадки",
			})
			onClose();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<ModalsLayout title={"Удалить товар?"} onClose={onClose}>
			<div className={styles.DeleteItemModal}>
				<p>
					Этот товар исчезнет с маркетплейса, и его нельзя будет восстановить.
					Вы уверены?
				</p>

				<div className={styles.actionButtons}>
					<Button
						variant="secondary"
						className={styles.actionButton}
						onClick={onClose}
					>
						Отменить действие
					</Button>

					<Button
						onClick={handleDeleteItem}
						variant={"destructive"}
						className={styles.actionButton}
					>
						Удалить
					</Button>
				</div>
			</div>
		</ModalsLayout>
	);
}
