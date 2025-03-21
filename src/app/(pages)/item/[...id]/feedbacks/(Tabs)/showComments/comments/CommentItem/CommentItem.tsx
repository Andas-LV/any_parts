"use client";

import styles from "./CommentItem.module.css";
import RatingStars from "@components/stars/RatingStars";
import { Icons } from "@/assets/svg";
import Image from "next/image";
import { Feedback } from "@/types/Feedbacks";
import { Button } from "@components/ui/button";
import { useState } from "react";

interface CommentItemProps {
	comment: Feedback;
}

export default function CommentItem({ comment }: CommentItemProps) {
	const [liked, setLiked] = useState(comment.likedByMe);

	return (
		<div key={comment.id} className={styles.commentItem}>
			<div className={styles.commentHeader}>
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
				<div className={styles.commentRating}>
					<RatingStars rating={comment.rating} />
				</div>
			</div>
			<div className={styles.commentBody}>
				<p>{comment.text}</p>
			</div>
			<div className={styles.commentFooter}>
				<Button
					onClick={() => setLiked(!liked)}
					variant="ghost"
					className={styles.likeBtn}
				>
					{liked ? (
						<Icons.ThumbsUpFilled width={24} height={24} />
					) : (
						<Icons.ThumbsUp width={24} height={24} />
					)}
					{comment.likes}
				</Button>

				<Button variant="outline" className={styles.replyBtn}>
					Ответить
				</Button>
			</div>
		</div>
	);
}
