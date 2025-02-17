import HeaderWrapper from "@/layouts/HeaderProvider";
import styles from "./profile.module.css";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@components/ui/tabs";
import React from "react";
import Main from './(Tabs)/Main'
import Favorite from "@/app/(pages)/profile/(Tabs)/Favorite";
import Refund from "@/app/(pages)/profile/(Tabs)/Refund";
import Orders from "@/app/(pages)/profile/(Tabs)/Orders";

export default function Profile() {

    return (
        <div>
            <HeaderWrapper>
                <div className={styles.wrapper}>
                    <Tabs defaultValue="main" className={styles.tabsContainer}>
                        <div className={styles.tabsListWrapper}>
                            <TabsList className={styles.tabsList}>
                                <TabsTrigger value="main" className={styles.tabsTrigger}>
                                    Главная
                                </TabsTrigger>
                                <TabsTrigger value="orders" className={styles.tabsTrigger}>
                                    Заказы
                                </TabsTrigger>
                                <TabsTrigger value="refund" className={styles.tabsTrigger}>
                                    Возврат
                                </TabsTrigger>
                                <TabsTrigger value="favorite" className={styles.tabsTrigger}>
                                    Избранное
                                </TabsTrigger>
                                <TabsTrigger value="purse" className={styles.tabsTrigger}>
                                    AP кошелёк
                                </TabsTrigger>
                                <TabsTrigger value="feedback" className={styles.tabsTrigger}>
                                    Отзывы и вопросы
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <div className={styles.tabsContent}>
                            <TabsContent value="main">
                                <Main/>
                            </TabsContent>

                            <TabsContent value="orders">
                                <Orders/>
                            </TabsContent>

                            <TabsContent value="refund">
                                <Refund/>
                            </TabsContent>

                            <TabsContent value="favorite">
                                <Favorite/>
                            </TabsContent>

                            <TabsContent value="purse">
                            </TabsContent>

                            <TabsContent value="feedback">
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>
            </HeaderWrapper>
        </div>
    )
}