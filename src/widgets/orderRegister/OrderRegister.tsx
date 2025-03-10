"use client";

import styles from "./OrderRegister.module.css";
import { Button } from "@components/ui/button";
import { useBasketStore } from "@/entities/basket/useBasketStore";
import DiscountModal from "@/widgets/modals/discount/discountModal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCurrencySymbol } from "@/hooks/useCurrency";
import { useUserStore } from "@/entities/user/useUserStore";

interface IOrderProps {
	type: "basket" | "order" | null;
}

export default function OrderRegister({ type }: IOrderProps) {
	const { totalPrice, finalPrice, totalDiscount, totalSelectedQuantity } =
		useBasketStore();
	const { user } = useUserStore();

	const router = useRouter();

	const [openModal, setOpenModal] = useState(false);

	return (
		<div className={styles.wrapper}>
			{type === "basket" && (
				<Button onClick={() => router.push("/order")} className={styles.btn}>
					Перейти к оформлению
				</Button>
			)}

			{type === "order" && (
				<Button className={styles.btn}>Оплатить онлайн</Button>
			)}

			<p className={styles.subtitle}>
				Доступные пункты выдачи можно выбрать при оформлении заказа
			</p>

			<div className={styles.cartInfo}>
				<div className={styles.row}>
					<h3 className={styles.cartTitle}>Ваша корзина</h3>
					<span className={styles.description}>Товары</span>
				</div>

				<div className={styles.row}>
					<span>Товары ({totalSelectedQuantity()})</span>
					<span className={styles.price}>
						{totalPrice().toLocaleString()}
						{user && useCurrencySymbol(user.currency)}
					</span>
				</div>

				<div className={styles.row}>
					<span>Скидка</span>
					<span className={styles.discount}>
						{totalDiscount() > 0 && "-"}
						{totalDiscount().toLocaleString()}{" "}
						{user && useCurrencySymbol(user.currency)}
					</span>
				</div>

				<button
					onClick={() => setOpenModal(true)}
					className={styles.detailsLink}
				>
					Подробнее
				</button>
			</div>

			<div className={styles.row}>
				<span className={styles.total}>Общая стоимость</span>

				<span className={styles.total}>
					{finalPrice().toLocaleString()}{" "}
					{user && useCurrencySymbol(user.currency)}
				</span>
			</div>

			{openModal && <DiscountModal onClose={() => setOpenModal(false)} />}
		</div>
	);
}
