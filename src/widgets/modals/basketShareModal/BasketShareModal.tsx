import React, { FC } from "react";
import styles from "./BasketShareModal.module.css";
import { useBasketStore } from "@/entities/basket/useBasketStore";
import BasketCard from "@components/cards/ItemCards/BasketCard/BasketCard";
import ModalsLayout from "@/layouts/modalLayout/layout";
import { Button } from "@components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCurrencySymbol } from "@/hooks/useCurrency";
import { useUserStore } from "@/entities/user/useUserStore";

interface BasketShareModalProps {
	onClose: () => void;
}

const BasketShareModal = ({ onClose }: BasketShareModalProps) => {
	const { selectedItems, finalPrice, totalSelectedQuantity } = useBasketStore();
	const { user } = useUserStore();
	const { toast } = useToast();

	const handleShare = () => {
		onClose();
		toast({
			done: true,
			variant: "success",
			description: "Ссылка скопирована.",
		});
	};

	return (
		<ModalsLayout
			title={"Поделиться выбранными товарами вашей корзины"}
			onClose={onClose}
		>
			<div className={styles.BasketShareModal}>
				<div className={styles.cardsWrapper}>
					{selectedItems().map((item, index) => (
						<div className={styles.card} key={index}>
							<BasketCard item={item} notToShare={false} />
						</div>
					))}
				</div>

				<Button onClick={handleShare} className={styles.btn}>
					Поделиться
				</Button>

				<p>
					Товары({totalSelectedQuantity()}) на сумму {finalPrice()}
					{user && useCurrencySymbol(user.currency)}
				</p>
			</div>
		</ModalsLayout>
	);
};

export default BasketShareModal;
