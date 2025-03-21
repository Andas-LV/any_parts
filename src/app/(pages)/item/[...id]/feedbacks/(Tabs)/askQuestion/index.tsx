"use client";

import styles from "./askQuestion.module.css";
import { useItemsStore } from "@/entities/items/useItemsStore";
import CommentItem from "@/app/(pages)/item/[...id]/feedbacks/(Tabs)/showComments/comments/CommentItem/CommentItem";
import React, { useState } from "react";
import { Button } from "@components/ui/button";
import { Checkbox } from "@components/ui/checkbox";
import { Label } from "@components/ui/label";

export function AskQuestion() {
	const { currentItem } = useItemsStore();
	const [question, setQuestion] = useState("");
	const [anonymous, setAnonymous] = useState(false);

	const toggleCheckbox = () => {
		setAnonymous(!anonymous);
	}

	const submit = () => {
		const form = {
			question: question,
			anonymous: anonymous,
		}
		console.log("form:", form);
	}

	return (
		<div className={styles.askQuestionWrapper}>
			<div className={styles.comments}>
				{currentItem?.comments.list.map((comment, i) => (
					<CommentItem key={i} comment={comment} />
				))}
			</div>

			<div className={styles.questionForm}>
				<h2>
					Задайте вопрос о товаре
				</h2>

				<input
					value={question}
					onChange={(e) => setQuestion(e.target.value)}
					type="text"
					placeholder={"Напишите вопрос"}
					className={styles.input}
				/>

				<Button className={styles.sendBtn} onClick={submit}>
					Отправить
				</Button>

				<div className={styles.checkboxWrapper}>
					<Checkbox
						onCheckedChange={toggleCheckbox}
						className={styles.checkbox}
						checked={anonymous}
					/>
					<Label>Опубликовать анонимно</Label>
				</div>
			</div>
		</div>
	);
}
