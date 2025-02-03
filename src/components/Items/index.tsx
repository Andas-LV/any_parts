"use client"

import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import styles from "./items.module.css";
import Discounted from "@/components/Items/Discounted/Discounted";
import Recommended from "@/components/Items/Recommended/Recommended";
import Popular from "@/components/Items/Popular/Popular";

export function Items() {
    const [isTabsFixed, setIsTabsFixed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const tabsElement = document.getElementById('itemsTabs');
            const mainHeader = document.querySelector(`.${styles.mainHeaderWrapper}`);
            const mainHeaderHeight = mainHeader?.getBoundingClientRect().height || 0;

            if (tabsElement) {
                const tabsTop = tabsElement.getBoundingClientRect().top;
                setIsTabsFixed(tabsTop <= mainHeaderHeight);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div id="itemsTabs">
            <Tabs defaultValue="sale" className={styles.tabsContainer}>
                <div className={`${styles.tabsListWrapper} ${isTabsFixed ? styles.fixed : ''}`}>
                    <TabsList className={styles.tabsList}>
                        <TabsTrigger value="sale" className={styles.tabsTrigger}>
                            Распродажа
                        </TabsTrigger>
                        <TabsTrigger value="recommended" className={styles.tabsTrigger}>
                            Рекомендуем вам
                        </TabsTrigger>
                        <TabsTrigger value="popular" className={styles.tabsTrigger}>
                            Популярные товары
                        </TabsTrigger>
                    </TabsList>
                </div>

                <div className={styles.tabsContent}>
                    <TabsContent value="sale">
                        <Discounted />
                    </TabsContent>
                    <TabsContent value="recommended">
                        <Recommended />
                    </TabsContent>
                    <TabsContent value="popular">
                        <Popular />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}