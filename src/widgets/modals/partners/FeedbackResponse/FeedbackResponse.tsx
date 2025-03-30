import React from "react";
import styles from "./FeedbackResponse.module.css";
import { PartnerFeedback } from "@/types/partners/Feedbacks";
import { useToast } from "@/hooks/use-toast";
import {
	itemDeliveryStatuses,
	partnerFeedbackStatuses,
} from "@/constants/status";
import { formatDate } from "@/utils/formatDate";
import { Button } from "@components/ui/button";
import { Icons } from "@/assets/svg/svg";
import { Textarea } from "@components/ui/textarea";
import SideModalLayout from "@/layouts/SideModalLayout/SideModalLayout";
import RatingStars from "@components/stars/RatingStars";

interface FeedbackResponseProps {
	feedback: PartnerFeedback;
	onClose: () => void;
}

export default function FeedbackResponse({
	feedback,
	onClose,
}: FeedbackResponseProps) {
	const { toast } = useToast();

	const reply = () => {
		onClose();
		toast({
			done: true,
			description: "Ваш ответ отправлен!",
		});
	};

	return (
		<SideModalLayout title="Отзыв на товар" onClose={onClose}>
			<div className={styles.scrollContainer}>
				<div className={styles.FeedbackResponse}>
					<h3>Общая информация</h3>

					<div className={styles.generalInfo}>
						<div className={styles.statusWrapper}>
							<div className={styles.param}>Статус</div>
							{partnerFeedbackStatuses
								.filter((s) => s.name === feedback.status)
								.map((status) => (
									<div
										key={status.name}
										style={{ backgroundColor: status.backgroundColor }}
										className={styles.status}
									>
										{status.name}
									</div>
								))}
						</div>

						<div className={styles.date}>
							<div className={styles.param}>Дата написания вопроса</div>
							<div className={styles.value}>
								{formatDate(feedback.time).date}
							</div>
						</div>

						<div className={styles.product}>
							<div className={styles.param}>Товар</div>
							<div className={styles.value}>{feedback.item.productName}</div>
						</div>

						<div className={styles.statusWrapper}>
							<div className={styles.param}>Статус получения товара</div>
							{itemDeliveryStatuses
								.filter((s) => s.name === feedback.receiverStatus)
								.map((status) => (
									<div
										key={status.name}
										style={{ backgroundColor: status.backgroundColor }}
										className={styles.status}
									>
										{status.name}
									</div>
								))}
						</div>

						<div className={styles.user}>
							<div className={styles.param}>Покупатель</div>
							<div className={styles.value}>{feedback.customer}</div>
						</div>

						<div className={styles.rating}>
							<div className={styles.param}>Оценка</div>
							<div className={styles.value}>
								<RatingStars rating={feedback.feedback.rating} />
							</div>
						</div>
					</div>

					<h3>Общая информация</h3>

					<div className={styles.generalInfo}>
						<div className={styles.comment}>
							<div className={styles.param}>Комментарий</div>
							<div className={styles.value}>{feedback.feedback.text}</div>
						</div>

						<div className={styles.images}>
							<div className={styles.param}>Фотографии</div>
							<div className={styles.value}>
								{feedback.feedback.images?.map((image, index) => (
									<img
										key={index}
										src={image}
										alt={image}
										className={styles.image}
									/>
								))}
							</div>
						</div>

						<div className={styles.helpful}>
							<div className={styles.param}>Полезный</div>
							<div className={styles.value}>
								<Button variant="ghost" className={styles.likeBtn}>
									<Icons.ThumbsUp width={24} height={24} />
									{feedback.feedback.likes}
								</Button>
							</div>
						</div>
					</div>

					<h3>В ответ {feedback.customer}</h3>

					<div className={styles.answerSection}>
						<Textarea
							className={styles.answerTextarea}
							placeholder="Ваш ответ"
						/>
						<Button onClick={reply} className={styles.sendButton}>
							Отправить ответ
						</Button>
					</div>
				</div>
			</div>
		</SideModalLayout>
	);
}
