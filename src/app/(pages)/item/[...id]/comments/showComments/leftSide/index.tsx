"use client"

import {ItemInfoType} from "@/types/Item";
import styles from "./leftSide.module.css";
import RatingStars from "@components/RatingStars";
import React from "react";
import {Icons} from "@/assets/svg";
import {Progress} from "@components/ui/progress";
import CommentItem from "@/app/(pages)/item/[...id]/comments/showComments/leftSide/Comment/Comment";
import {Button} from "@components/ui/button";

export function CommentsSection({ ...item }: ItemInfoType) {
    const total = Object.values(item.ratingDistribution).reduce((a, b) => a + b, 0);

    const ratingRows = [5, 4, 3, 2, 1].map((stars) => {
        const count = item.ratingDistribution[stars as keyof typeof item.ratingDistribution] || 0;
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
                <Progress
                    value={percentage}
                    className={styles.progressBar}
                />
                <div className={styles.ratingCount}>
                    {count}
                </div>
            </div>
        );
    });

    return (
        <div className={styles.wrapper}>
            <div className={styles.ratingContainer}>
                <div className={styles.generalRating}>
                    <div className={styles.rating}>
                        <span>{item.rating.toFixed(1)}</span>
                        <RatingStars rating={item.rating}/>
                    </div>

                    <Button variant="link">
                        Все {item.comments.amount} отзывов
                    </Button>

                    <p>{item.sold} купили</p>
                </div>

                <div className={styles.ratingDistributionContainer}>
                    {ratingRows}
                </div>
            </div>

            {item.comments.list.map((comment, i) => (
                <CommentItem key={i} comment={comment} />
            ))}
        </div>
    );
}