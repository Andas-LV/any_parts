"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import styles from "./comments.module.css";
import {ShowComments} from "@/app/(pages)/item/[...id]/comments/showComments";
import {AskQuestion} from "@/app/(pages)/item/[...id]/comments/askQuestion";
import {ItemInfoType} from "@/types/Item";

export function Comments({ ...item }: ItemInfoType) {

    return (
        <div id="itemsTabs">
            <Tabs defaultValue="comments" className={styles.tabsContainer}>
                <div className={styles.tabsListWrapper}>
                    <TabsList className={styles.tabsList}>
                        <TabsTrigger value="comments" className={styles.tabsTrigger}>
                            Отзывы
                        </TabsTrigger>
                        <TabsTrigger value="askQuestion" className={styles.tabsTrigger}>
                            Задать вопрос
                        </TabsTrigger>
                    </TabsList>
                </div>

                <div className={styles.tabsContent}>
                    <TabsContent value="comments">
                        <ShowComments {...item}/>
                    </TabsContent>
                    <TabsContent value="askQuestion">
                        <AskQuestion {...item}/>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}