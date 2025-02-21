"use client"

import HeaderWrapper from "@/layouts/HeaderProvider";
import styles from "./profile.module.css";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@components/ui/tabs";
import React from "react";
import Main from './(Tabs)/Main'
import Favorite from "@/app/(pages)/profile/(Tabs)/Favorite";
import Refund from "@/app/(pages)/profile/(Tabs)/Refund";
import Orders from "@/app/(pages)/profile/(Tabs)/Orders";
import Purse from "@/app/(pages)/profile/(Tabs)/Purse";
import Feedback from "@/app/(pages)/profile/(Tabs)/Feedback";
import {useUserStore} from "@/entities/user/useUserStore";
import {TProfileTabs} from "@/types/Profile";

export default function Profile() {
    const { activeProfileTab, setActiveProfileTab } = useUserStore();

    return (
        <div>
            <HeaderWrapper>
                <div className={styles.wrapper}>
                    <Tabs
                        value={activeProfileTab}
                        onValueChange={(value) => setActiveProfileTab(value  as TProfileTabs)}
                        className={styles.tabsContainer}
                    >
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
                                <Purse/>
                            </TabsContent>

                            <TabsContent value="feedback">
                                <Feedback/>
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>
            </HeaderWrapper>
        </div>
    )
}