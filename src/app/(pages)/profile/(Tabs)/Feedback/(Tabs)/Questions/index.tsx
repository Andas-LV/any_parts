import styles from "./tab.module.css";
import { Button } from "@components/ui/button";
import { useUserStore } from "@/entities/user/useUserStore";
import QuestionCard from "@components/cards/QuestionCard/QuestionCard";
import { useItemsStore } from "@/entities/items/useItemsStore";
import React, { useEffect } from "react";
import { useFeedbacksStore } from "@/entities/customer/feedbacks/useFeedbackStore";

export default function Questions() {
	const { setActiveProfileTab } = useUserStore();
	const { itemInfo } = useItemsStore();
	const { getQuestions, isLoading } = useFeedbacksStore();

	useEffect(() => {
		getQuestions();
	}, []);

	const noItems = !itemInfo || itemInfo.length === 0;

	return (
		<div className={styles.wrapper}>
			<p className={styles.title}>Эти вопросы ждут ответа</p>

			{noItems ? (
				<div className={styles.noContentWrapper}>
					<div className={styles.noContentTitle}>Здесь будут ваши вопросы</div>
					<p>Задавайте интересующие вас вопросы в разделе товаров</p>

					<Button
						onClick={() => setActiveProfileTab("orders")}
						className={styles.routerBtn}
					>
						Перейти в товары
					</Button>
				</div>
			) : (
				<div className={styles.contentWrapper}>
					<div className={styles.griddedQuestions}>
						{itemInfo.map((item) => {
							if (!item.comments || !item.comments.list) return null;

							return item.comments.list.map((comment) => (
								<QuestionCard key={comment.id} item={item} comment={comment} />
							));
						})}
					</div>

					<Button variant="outline" disabled={isLoading}>
						Показать ещё
					</Button>
				</div>
			)}
		</div>
	);
}
