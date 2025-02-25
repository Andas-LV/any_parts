import {Card} from "@components/ui/card";
import styles from './questionCard.module.css'
import {Button} from "@components/ui/button";
import {Icons} from "@/assets/svg";
import React, {useState} from "react";
import {Feedback} from "@/types/Feedbacks";
import Image from "next/image";
import { ItemInfoType} from "@/types/Item";

interface QuestionItemProps {
    item: ItemInfoType;
    comment: Feedback;
}

export default function QuestionCard({ item, comment }: QuestionItemProps) {
    const [liked, setLiked] = useState(comment.likedByMe);

    return (
        <Card className={styles.card}>
            <div className={styles.item}>
                <img
                    src={item.images[0]}
                    alt={item.name}
                    className={styles.itemImage}
                />
                <div className={styles.itemInfo}>
                    <div className={styles.itemNamePrice}>
                        <span>{item.marketName} / {item.name}</span>
                        <span className={styles.itemPrice}>{item.price.toLocaleString("ru-RU")} ₸</span>
                    </div>
                    <div className={styles.itemDetails}>
                        <span>Артикул: {item.article}</span>
                        <span>Order configuration</span>
                    </div>
                </div>
            </div>

            <div className={styles.userInfo}>
                <Image
                    src={comment.user.avatarUrl || '/user.png'}
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

            <div className={styles.question}>
                {comment.text}
            </div>

            <div className={styles.actions}>
                <Button onClick={() => setLiked(!liked)} variant="ghost" className={styles.likeBtn}>
                    {liked ?
                        <Icons.ThumbsUpFilled width={24} height={24}/> :
                        <Icons.ThumbsUp width={24} height={24}/>
                    }
                    {comment.likes}
                </Button>

                <Button variant="outline" className={styles.replyBtn}>Ответить</Button>
            </div>
        </Card>
    )
}