import styles from "./page.module.css"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@components/ui/tabs";
import React from "react";
import Feedbacks from "@/app/(pages)/profile/(Tabs)/Feedback/(Tabs)/Feedbacks";
import Questions from "@/app/(pages)/profile/(Tabs)/Feedback/(Tabs)/Questions";

export default function Feedback() {
    return (
        <div className={styles.wrapper}>
            <Tabs defaultValue="feedbacks" className={styles.tabsContainer}>
                <div className={styles.tabsListWrapper}>
                    <TabsList className={styles.tabsList}>
                        <TabsTrigger value="feedbacks" className={styles.tabsTrigger}>
                            Отзывы
                        </TabsTrigger>

                        <TabsTrigger value="questions" className={styles.tabsTrigger}>
                            Вопросы
                        </TabsTrigger>
                    </TabsList>
                </div>

                <div className={styles.tabsContent}>
                    <TabsContent value="feedbacks">
                        <Feedbacks/>
                    </TabsContent>

                    <TabsContent value="questions">
                        <Questions/>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    )
}