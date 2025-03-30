import React from "react";
import styles from "./QuestionResponse.module.css";
import SideModalLayout from "@/layouts/SideModalLayout/SideModalLayout";
import { PartnerQuestion } from "@/types/partners/Feedbacks";
import { Button } from "@components/ui/button";
import { formatDate } from "@/utils/formatDate";
import { partnerFeedbackStatuses } from "@/constants/status";
import { Icons } from "@/assets/svg/svg";
import { Textarea } from "@components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface QuestionResponseProps {
	question: PartnerQuestion;
	onClose: () => void;
}

export default function QuestionResponse({
	question,
	onClose,
}: QuestionResponseProps) {
	const { toast } = useToast();

	const reply = () => {
		onClose();
		toast({
			done: true,
			description: "Ваш ответ отправлен!",
		});
	};

	return (
		<SideModalLayout title="Вопрос на товар" onClose={onClose}>
			<div className={styles.scrollContainer}>
				<div className={styles.QuestionResponse}>
					<h3>Общая информация</h3>

					<div className={styles.generalInfo}>
						<div className={styles.statusWrapper}>
							<div className={styles.param}>Статус</div>
							{partnerFeedbackStatuses
								.filter((s) => s.name === question.status)
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
								{formatDate(question.time).date}
							</div>
						</div>

						<div className={styles.product}>
							<div className={styles.param}>Товар</div>
							<div className={styles.value}>{question.item.productName}</div>
						</div>

						<div className={styles.user}>
							<div className={styles.param}>Пользователь</div>
							<div className={styles.value}>{question.customer}</div>
						</div>
					</div>

					<h3>Общая информация</h3>

					<div className={styles.questionContent}>
						<div className={styles.question}>
							<div className={styles.param}>Вопрос</div>
							<div className={styles.value}>{question.question}</div>
						</div>

						<div className={styles.helpful}>
							<div className={styles.param}>Полезный</div>
							<div className={styles.value}>
								<Button variant="ghost" className={styles.likeBtn}>
									<Icons.ThumbsUp width={24} height={24} />
									{question.helpful}
								</Button>
							</div>
						</div>
					</div>

					<h3>В ответ {question.customer}</h3>

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
