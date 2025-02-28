import {useFeedbacksStore} from "@/entities/feedbacks/useFeedbackStore";
import {useEffect} from "react";
import styles from './tab.module.css'
import {Button} from "@components/ui/button";
import {useUserStore} from "@/entities/user/useUserStore";
import FeedbackCard from "../../../../../../../components/cards/FeedbackCard";
import WaitingFeedback from "./WaitingFeedback";

export default function Feedbacks() {
    const { setActiveProfileTab } = useUserStore()
    const { myFeedbacks, getMyFeedbacks, isLoading, error } = useFeedbacksStore()

    const feedbackItemsEmpty = !myFeedbacks || myFeedbacks.length === 0

    useEffect(() => {
        getMyFeedbacks();
    }, [])

    return(
        <div className={styles.wrapper}>
            <div className={styles.block}>
                <p>Эти товары ждут отзыва</p>
                <WaitingFeedback/>
            </div>

            <div className={styles.block}>
                <p>Вы уже оценили</p>
                {feedbackItemsEmpty ? (
                    <div className={styles.noContentWrapper}>
                        <div className={styles.noContentTitle}>
                            Здесь будут ваши отзывы
                        </div>
                        <p>
                            Помогите другим покупателям сделать выбор — поделитесь мнением о товарах в разделе Покупки
                        </p>

                        <Button onClick={() => setActiveProfileTab("orders")} className={styles.routerBtn}>
                            Перейти в покупки
                        </Button>
                    </div>
                ) : (
                    <div>
                        <div className={styles.feedbackCardsWrapper}>
                            {myFeedbacks.map((feedback, index) => (
                                <FeedbackCard key={index} feedback={feedback}/>
                            ))}
                        </div>

                        <Button variant="outline" disabled={isLoading}>
                            Показать ещё
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}