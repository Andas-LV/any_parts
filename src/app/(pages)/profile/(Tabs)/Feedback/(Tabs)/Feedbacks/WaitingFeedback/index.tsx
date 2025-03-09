import { useFeedbacksStore } from "@/entities/feedbacks/useFeedbackStore";
import React, { useEffect, useState } from "react";
import styles from "./tab.module.css";
import { Button } from "@components/ui/button";
import { useUserStore } from "@/entities/user/useUserStore";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@components/ui/card";
import RatingStars from "@components/stars/RatingStars";
import CreateFeedback from "@/widgets/modals/feedback/createFeedback";

export default function WaitingFeedback() {
	const { setActiveProfileTab } = useUserStore();
	const { unRatedOrders, getUnratedOrders, isLoading, error } =
		useFeedbacksStore();
	const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
	const [itemId, setItemId] = useState(0);

	const unRatedOrdersEmpty = !unRatedOrders || unRatedOrders.length === 0;

	const selectItemToFeedback = (itemId: number) => {
		setItemId(itemId);
		setIsFeedbackOpen(true);
	};

	useEffect(() => {
		getUnratedOrders();
	}, []);

	return (
		<div className={styles.wrapper}>
			{unRatedOrdersEmpty ? (
				<div className={styles.noContentWrapper}>
					<div className={styles.noContentTitle}>
						Вы уже оставили отзыв всем заказам
					</div>
					<p>Спасибо что помогаете другим покупателям сделать выбор</p>

					<Button
						onClick={() => setActiveProfileTab("orders")}
						className={styles.routerBtn}
					>
						Перейти в отзывы
					</Button>
				</div>
			) : (
				<div>
					<div className={styles.unRatedOrdersCardsWrapper}>
						{unRatedOrders.map((order, index) => (
							<Card key={index} className={styles.card}>
								<CardHeader className={styles.cardHeader}>
									{order.image && (
										<img
											src={order.image}
											alt={order.name}
											className={styles.image}
										/>
									)}

									<div className={styles.headerDetails}>
										<CardTitle className={styles.cardTitle}>
											{order.shopName} / {order.productName}
										</CardTitle>
										<CardDescription>Configuration</CardDescription>
									</div>
								</CardHeader>

								<div
									title={"Оценить"}
									className={styles.commentRating}
									onClick={() => selectItemToFeedback(order.id)}
								>
									<RatingStars rating={0} width={48} height={48} gap={10} />
								</div>
							</Card>
						))}
					</div>

					<Button variant="outline" disabled={isLoading}>
						Показать ещё
					</Button>
				</div>
			)}

			{isFeedbackOpen && (
				<CreateFeedback
					feedbackType={"Новый"}
					onClose={() => setIsFeedbackOpen(false)}
					itemId={itemId}
				/>
			)}
		</div>
	);
}
