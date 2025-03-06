import PartnersHeader from "@components/PartnersHeader/PartnersHeader";
import styles from "./partnerPage.module.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import * as React from "react";
import CreateItem from "@/app/(pages)/partners/(Tabs)/CreateItem/CreateItem";

export default function Page() {
  return (
    <div className={styles.wrapper}>
      <PartnersHeader />

      <Tabs defaultValue="main">
        <TabsList className={styles.tabsList}>
          <TabsTrigger value="main" className={styles.tabsTrigger}>
            Главная
          </TabsTrigger>
          <TabsTrigger value="items" className={styles.tabsTrigger}>
            Товары
          </TabsTrigger>
          <TabsTrigger value="fbo" className={styles.tabsTrigger}>
            FBO
          </TabsTrigger>
          <TabsTrigger value="progress" className={styles.tabsTrigger}>
            Продвижение
          </TabsTrigger>
          <TabsTrigger value="feedback" className={styles.tabsTrigger}>
            Отзывы и вопросы
          </TabsTrigger>
        </TabsList>

        <TabsContent value="main">
          <p>Контент для вкладки «Главная»</p>
        </TabsContent>
        <TabsContent value="items">
          <CreateItem />
        </TabsContent>
        <TabsContent value="fbo">
          <p>Контент для вкладки «FBO»</p>
        </TabsContent>
        <TabsContent value="progress">
          <p>Контент для вкладки «Продвижение»</p>
        </TabsContent>
        <TabsContent value="feedback">
          <p>Контент для вкладки «Отзывы и вопросы»</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
