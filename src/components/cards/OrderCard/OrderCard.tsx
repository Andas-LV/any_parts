import React, { useState } from "react";
import { StatusChoice, TOrder } from "@/types/Orders";
import styles from "./orderCard.module.css";
import { Button } from "@components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/assets/svg";
import { getOrderStatusStyle, getOrderAction } from "./getOrderStatusStyle";
import CreateFeedback from "@/widgets/modals/feedback/createFeedback";
import OrderCardSkeleton from "@components/skeletons/OrderCardSkeleton/OrderCardSkeleton";
import { useCurrencySymbol } from "@/hooks/useCurrency";
import { useUserStore } from "@/entities/user/useUserStore";

interface OrderCardProps {
	order: TOrder;
}

export default function OrderCard({ order }: OrderCardProps) {
	if (!order) {
		return <OrderCardSkeleton />;
	}

	const { user } = useUserStore();

	const {
		name,
		orderId,
		shopName,
		productName,
		address,
		price,
		status,
		card,
		image,
	} = order;

	const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
	const orderAction = getOrderAction(status as StatusChoice, () =>
		setIsFeedbackOpen(true),
	);

	return (
		<Card>
			<CardHeader className={styles.orderCardHeader}>
				<img src={image} alt={name} className={styles.image} />
				<div className={styles.headerDetails}>
					<CardTitle className={styles.cardTitle}>{name}</CardTitle>
					<CardDescription>{orderId}</CardDescription>

					<span className={getOrderStatusStyle(status as StatusChoice)}>
						{status}
					</span>
				</div>
			</CardHeader>
			<CardContent>
				<div className={styles.detailWrapper}>
					<Icons.Package width={20} height={20} />
					<div className={styles.detailInfo}>
						<div className={styles.label}>
							{shopName} / {productName}
						</div>
						<div className={styles.value}>Order configuration</div>
					</div>
				</div>

				<div className={styles.detailWrapper}>
					<Icons.Location width={20} height={20} />
					<div className={styles.detailInfo}>
						<div className={styles.label}>Пункт выдачи товаров Any Parts</div>
						<div className={styles.value}>{address}</div>
						<Button variant="link" className={styles.link}>
							Посмотреть на карте
						</Button>
					</div>
				</div>

				<div className={styles.detailWrapper}>
					<Icons.Check width={20} height={20} />
					<div className={styles.detailInfo}>
						<div className={styles.label}>Электронный чек</div>
						<Button variant="link" className={styles.link}>
							Посмотреть
						</Button>
					</div>
				</div>

				<div className={styles.detailWrapper}>
					<Icons.CreditCard width={20} height={20} />
					<div className={styles.detailInfo}>
						<div className={styles.label}>
							Сумма {price} {user && useCurrencySymbol(user.currency)}
						</div>
						<div className={styles.value}>
							{card.type} •• {card.cardId.toString().slice(-4)}
						</div>
					</div>
				</div>
			</CardContent>
			<CardFooter>
				<Button
					variant={orderAction.variant}
					className={styles.button}
					onClick={orderAction.onClick}
				>
					{orderAction.text}
				</Button>
			</CardFooter>

			{isFeedbackOpen && (
				<CreateFeedback
					feedbackType={"Новый"}
					onClose={() => setIsFeedbackOpen(false)}
					itemId={orderId}
				/>
			)}
		</Card>
	);
}
