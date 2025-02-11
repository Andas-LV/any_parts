import styles from "./comment.module.css";
import RatingStars from "@components/RatingStars";
import {Icons} from "@/assets/svg";
import Image from "next/image";
import {Comment} from "@/types/Comments";
import {Button} from "@components/ui/button";

interface CommentItemProps {
    comment: Comment;
}

export default function CommentItem({ comment }: CommentItemProps) {
    return (
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
                    <Icons.ThumbsUp width={24} height={24}/>
                    {comment.likes}
                </Button>

                <Button variant="outline" className={styles.replyBtn}>Ответить</Button>
            </div>
        </div>
    )
}