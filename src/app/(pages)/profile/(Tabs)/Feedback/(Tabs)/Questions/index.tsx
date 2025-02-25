import {useFeedbacksStore} from "@/entities/feedbacks/useFeedbackStore";
import {useEffect} from "react";
import styles from './tab.module.css'
import {Button} from "@components/ui/button";
import {useUserStore} from "@/entities/user/useUserStore";
import WaitingFeedback from "@/app/(pages)/profile/(Tabs)/Feedback/(Tabs)/Feedbacks/WaitingFeedback";
import QuestionCard from "@components/QuestionCard/QuestionCard";
import {useItemsStore} from "@/entities/items/useItemsStore";

export default function Questions() {
    const { setActiveProfileTab } = useUserStore()
    const {} = useItemsStore()
    const { questions, getQuestions, isLoading, error } = useFeedbacksStore()

    const questionsEmpty = !questions || questions.length === 0

    useEffect(() => {
        getQuestions();
    }, [])

    return(
        <div className={styles.wrapper}>
            <div className={styles.block}>
                <p>Эти вопросы ждут ответа</p>
                {/*<QuestionCard item={}/>*/}
            </div>

            {questionsEmpty ? (
                <div className={styles.noContentWrapper}>
                    <div className={styles.noContentTitle}>
                        Здесь будут ваши вопросы
                    </div>
                    <p>
                        Задавайте интересующие вас вопросы в разделе товаров
                    </p>

                    <Button onClick={() => setActiveProfileTab("orders")} className={styles.routerBtn}>
                        Перейти в товары
                    </Button>
                </div>
            ) : (
                <div>
                    <div className={styles.questionCardsWrapper}>

                    </div>

                    <Button variant="outline" disabled={isLoading}>
                        Показать ещё
                    </Button>
                </div>
            )}
        </div>
    )
}