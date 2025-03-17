"use client";

import styles from "./leftSide.module.css";
import RatingStars from "@components/stars/RatingStars";
import React, { useState } from "react";
import { Icons } from "@/assets/svg";
import { Progress } from "@components/ui/progress";
import CommentItem from "@/app/(pages)/item/[...id]/feedbacks/showComments/comments/CommentItem/CommentItem";
import { Button } from "@components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { useItemsStore } from "@/entities/items/useItemsStore";

const ratings = [1, 2, 3, 4, 5];
const filters = ["Сначала полезные", "Сначала популярные"];

export function CommentsSection() {
	const { currentItem } = useItemsStore();
	const item = currentItem;

	if (!item) {
		return null;
	}

	const [isOpen, setIsOpen] = useState(false);
	const [isRatingOpen, setIsRatingOpen] = useState(false);

	const total = Object.values(item.ratingDistribution).reduce(
		(a, b) => a + b,
		0,
	);

	const ratingRows = ratings.map((stars) => {
		const count =
			item.ratingDistribution[stars as keyof typeof item.ratingDistribution] ||
			0;
		const percentage = item.comments.amount > 0 ? (count / total) * 100 : 0;

		return (
			<div key={stars} className={styles.ratingRow}>
				<div className={styles.starsContainer}>
					{[...Array(stars)].map((_, i) => (
						<Icons.Star key={i} width={16} height={16} />
					))}
					{[...Array(5 - stars)].map((_, i) => (
						<Icons.StarEmpty key={i} width={16} height={16} />
					))}
				</div>
				<Progress value={percentage} className={styles.progressBar} />
				<div className={styles.ratingCount}>{count}</div>
			</div>
		);
	});

	return (
		<div className={styles.wrapper}>
			<div className={styles.ratingContainer}>
				<div className={styles.generalRating}>
					<div className={styles.rating}>
						<span>{item.rating.toFixed(1)}</span>
						<RatingStars rating={item.rating} />
					</div>

					<Button variant="link">Все {item.comments.amount} отзывов</Button>

					<p>{item.sold} купили</p>
				</div>

				<div className={styles.ratingDistributionContainer}>{ratingRows}</div>
			</div>

			<div className={styles.commentFilterContainer}>
				<div className={styles.commentFilters}>
					<Button variant="outline">С фото</Button>
					<Button variant="outline">Из Казахстана</Button>
					<DropdownMenu onOpenChange={setIsRatingOpen}>
						<DropdownMenuTrigger className={styles.ratingSelect}>
							Все звезды
							<Icons.ArrowDown
								className={`${styles.arrowIcon} ${isRatingOpen ? styles.rotated : ""}`}
							/>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							{ratings.map((star, i) => (
								<DropdownMenuItem key={i}>{star}</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				<DropdownMenu onOpenChange={setIsOpen}>
					<DropdownMenuTrigger className={styles.ratingSelect}>
						{filters[0]}
						<Icons.ArrowDown
							className={`${styles.arrowIcon} ${isOpen ? styles.rotated : ""}`}
						/>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						{filters.map((filter) => (
							<DropdownMenuItem key={filter}>{filter}</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			{item.comments.list.map((comment, i) => (
				<CommentItem key={i} comment={comment} />
			))}
		</div>
	);
}
