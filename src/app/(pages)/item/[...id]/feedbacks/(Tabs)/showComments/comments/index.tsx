"use client"

import React, { useState } from "react"
import styles from "./leftSide.module.css"
import { Icons } from "@/assets/svg/svg"
import RatingStars from "@components/stars/RatingStars"
import { Progress } from "@components/ui/progress"
import { Button } from "@components/ui/button"
import CommentItem from "./CommentItem/CommentItem"
import { useItemsStore } from "@/entities/items/useItemsStore"
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@components/ui/select"

const ratings = [1, 2, 3, 4, 5]
const filters = ["Сначала полезные", "Сначала популярные"]

export function CommentsSection() {
	const { currentItem: item } = useItemsStore()
	const [selectedRating, setSelectedRating] = useState<string>("")
	const [selectedFilter, setSelectedFilter] = useState<string>(filters[0])

	if (!item) return null

	const totalRatings = Object.values(item.ratingDistribution).reduce((a, b) => a + b, 0)

	return (
		<div className={styles.wrapper}>
			{/* Общий рейтинг */}
			<div className={styles.ratingContainer}>
				<div className={styles.generalRating}>
					<div className={styles.rating}>
						<span>{item.rating.toFixed(1)}</span>
						<RatingStars rating={item.rating} />
					</div>
					<Button variant="link">Все {item.comments.amount} отзывов</Button>
					<p>{item.sold} купили</p>
				</div>

				{/* Распределение рейтингов */}
				<div className={styles.ratingDistributionContainer}>
					{ratings.map((stars) => {
						const count = item.ratingDistribution[stars as keyof typeof item.ratingDistribution] || 0
						const percentage = totalRatings ? (count / totalRatings) * 100 : 0

						return (
							<div key={stars} className={styles.ratingRow}>
								<div className={styles.starsContainer}>
									{[...Array(5)].map((_, i) =>
										i < stars ? (
											<Icons.Star key={i} width={16} height={16} />
										) : (
											<Icons.StarEmpty key={i} width={16} height={16} />
										)
									)}
								</div>
								<Progress value={percentage} className={styles.progressBar} />
								<div className={styles.ratingCount}>{count}</div>
							</div>
						)
					})}
				</div>
			</div>

			{/* Фильтры */}
			<div className={styles.commentFilterContainer}>
				<div className={styles.commentFilters}>
					<Button variant="outline">С фото</Button>
					<Button variant="outline">Из Казахстана</Button>

					{/* Select по звёздам */}
					<Select value={selectedRating} onValueChange={setSelectedRating}>
						<SelectTrigger className={styles.ratingSelect}>
							<SelectValue placeholder="Все звезды" />
						</SelectTrigger>
						<SelectContent>
							{ratings.map((star) => (
								<SelectItem key={star} value={star.toString()}>
									{star}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{/* Select по сортировке */}
				<Select value={selectedFilter} onValueChange={setSelectedFilter}>
					<SelectTrigger className={styles.ratingSelect}>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{filters.map((filter) => (
							<SelectItem key={filter} value={filter}>
								{filter}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			{/* Список комментариев */}
			{item.comments.list.map((comment, i) => (
				<CommentItem key={i} comment={comment} />
			))}
		</div>
	)
}
