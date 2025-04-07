import React from "react";
import styles from "./ResponseToQuestionModal.module.css";
import ModalsLayout from "@/layouts/modalLayout/layout";
import Image from "next/image";
import { Feedback } from "@/types/Feedbacks";
import { Textarea } from "@components/ui/textarea";
import { Button } from "@components/ui/button";

interface ResponseToQuestionModalProps {
	comment: Feedback;
	onClose: () => void;
}

export const ResponseToQuestionModal = ({comment, onClose}: ResponseToQuestionModalProps) => {
	const handleResponse = () => {
		try{
			// запрос
			onClose();
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<ModalsLayout title="Ответ на вопрос" onClose={onClose}>
			<div className={styles.ResponseToQuestionModal}>
				<div className={styles.userInfo}>
					<Image
						src={comment.user.avatarUrl || "/user.png"}
						alt="avatar"
						width={40}
						height={40}
						quality={100}
						className={styles.userAvatar}
					/>

					<div className={styles.userDetails}>
						<span className={styles.userName}>{comment.user.username}</span>
						<span className={styles.commentDate}>{comment.date}</span>
					</div>
				</div>
				<div className={styles.commentBody}>
					<p>{comment.text}</p>
				</div>

				<Textarea
					className={styles.answerTextarea}
					placeholder="Напишите свой ответ"
				/>

				<div className={styles.actions}>
					<Button variant="secondary" onClick={onClose}>
						Отмена
					</Button>
					<Button onClick={handleResponse}>
						Отправить
					</Button>
				</div>
			</div>
		</ModalsLayout>
	);
}
