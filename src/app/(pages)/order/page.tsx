"use client";

import HeaderWrapper from "@/layouts/HeaderProvider";
import styles from "./page.module.css";
import { useBasketStore } from "@/entities/customer/basket/useBasketStore";
import React from "react";
import OrderRegister from "@/widgets/orderRegister/OrderRegister";
import { Button } from "@components/ui/button";
import { useRouter } from "next/navigation";
import PaymentBlock from "@/app/(pages)/order/Payment/PaymentBlock";
import Delivery from "@/app/(pages)/order/Delivery/Delivery";
import { Icons } from "@/assets/svg/svg";
import { routes } from "@/configs/routes";

export default function Order() {
	const { cartItems } = useBasketStore();
	const router = useRouter();

	return (
		<HeaderWrapper>
			<div className={styles.wrapper}>
				<div>
					<Button
						onClick={() => router.push(routes.basket())}
						variant={"link"}
						className={styles.goBack}
					>
						Вернуться в корзину
					</Button>
					<h1>Оформление заказа</h1>
				</div>

				<div className={styles.content}>
					<div className={styles.cardsBlock}>
						<PaymentBlock />
						<Delivery />
					</div>

					<div className={styles.rightSection}>
						<OrderRegister type={"order"} />

						<div className={styles.promoWrapper}>
							<h2 className={styles.certificateTitle}>Промокод</h2>

							<div className={styles.inputWrapper}>
								<Icons.Percent width={24} height={24} />

								<input
									type="text"
									placeholder="Код активации"
									className={styles.input}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</HeaderWrapper>
	);
}
