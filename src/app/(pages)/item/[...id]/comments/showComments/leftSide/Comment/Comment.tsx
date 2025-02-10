import styles from "./comment.module.css";
import RatingStars from "@components/RatingStars";
import {Icons} from "@/assets/svg";
import Image from "next/image";
import React, {useState} from "react";
import {Comment} from "@/types/Comments";
import {Button} from "@components/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@components/ui/dropdown-menu";

interface CommentItemProps {
    comment: Comment;
}

export default function CommentItem({ comment }: CommentItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.commentsContainer}>
            <div className={styles.commentFilterContainer}>
                <div className={styles.commentFilters}>
                    <Button variant="outline">С фото</Button>
                    <Button variant="outline">Из Казахстана</Button>
                    <DropdownMenu onOpenChange={setIsOpen}>
                        <DropdownMenuTrigger className={styles.ratingSelect}>
                            Все звезды
                            <Icons.ArrowDown className={`${styles.arrowIcon} ${isOpen ? styles.rotated : ""}`} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>1</DropdownMenuItem>
                            <DropdownMenuItem>2</DropdownMenuItem>
                            <DropdownMenuItem>3</DropdownMenuItem>
                            <DropdownMenuItem>4</DropdownMenuItem>
                            <DropdownMenuItem>5</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <DropdownMenu onOpenChange={setIsOpen}>
                    <DropdownMenuTrigger className={styles.ratingSelect}>
                        Сначала полезные
                        <Icons.ArrowDown className={`${styles.arrowIcon} ${isOpen ? styles.rotated : ""}`} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Сначала полезные</DropdownMenuItem>
                        <DropdownMenuItem>Сначала популярные</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div key={comment.id} className={styles.commentItem}>
                <div className={styles.commentHeader}>
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
                    <div className={styles.commentRating}>
                        <RatingStars rating={comment.rating}/>
                    </div>
                </div>
                <div className={styles.commentBody}>
                    <p>{comment.text}</p>
                </div>
                <div className={styles.commentFooter}>
                    <Button variant="ghost" className={styles.likeBtn}>
                        <Icons.ThumbsUp width={24} height={24} />
                        {comment.likes}
                    </Button>

                    <Button variant="outline" className={styles.replyBtn}>Ответить</Button>
                </div>
            </div>
        </div>
    )
}