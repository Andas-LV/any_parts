import {useFeedbacksStore} from "@/entities/feedbacks/useFeedbackStore";
import {useEffect} from "react";
import styles from './tab.module.css'
import {Button} from "@components/ui/button";
import {useUserStore} from "@/entities/user/useUserStore";

export default function Questions() {
    const { setActiveProfileTab } = useUserStore()
    const { questions, getQuestions, isLoading, error } = useFeedbacksStore()

    const questionsEmpty = !questions || questions.length === 0

    useEffect(() => {
        getQuestions();
    }, [])

    return(
        <div className={styles.wrapper}>
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