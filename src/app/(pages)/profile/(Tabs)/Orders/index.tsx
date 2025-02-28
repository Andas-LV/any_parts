"use client";

import styles from "./page.module.css";
import { useAuthStore } from "@/entities/auth/useAuthStore";
import { Button } from "@components/ui/button";
import { useOrdersStore } from "@/entities/orders/useOrdersStore";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import ActiveOrders from "@/app/(pages)/profile/(Tabs)/Orders/Active/ActiveOrders";
import ArchiveOrders from "@/app/(pages)/profile/(Tabs)/Orders/Archive/ArchiveOrders";

export default function Orders() {
  const { isAuthenticated } = useAuthStore();
  const { orders, getOrders } = useOrdersStore();

  const router = useRouter();
  const isOrders = !orders || orders.length === 0;

  useEffect(() => {
    getOrders();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className={styles.wrapper}>
        <h2>Заказы</h2>

        <p className={styles.nonAuth}>
          Для оформления заказа необходимо
          <Button variant={"link"} className={styles.linkToLogin}>
            авторизоваться.
          </Button>
        </p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {isOrders ? (
        <div className={styles.noOrdersWrapper}>
          <h2>Заказы</h2>
          <div className={styles.noOrdersTitle}>В заказах пока пусто</div>
          <p>
            Загляните на главную, чтобы выбрать товары <br /> или найдите нужное
            в поиске
          </p>

          <Button
            variant={"outline"}
            onClick={() => router.push("/")}
            className={styles.toMainBtn}
          >
            Перейти на главную
          </Button>
        </div>
      ) : (
        <Tabs defaultValue="active" className={styles.tabsContainer}>
          <div className={styles.tabsListWrapper}>
            <TabsList className={styles.tabsList}>
              <TabsTrigger value="active" className={styles.tabsTrigger}>
                Активные
              </TabsTrigger>
              <TabsTrigger value="archive" className={styles.tabsTrigger}>
                Архив
              </TabsTrigger>
            </TabsList>
          </div>

          <div className={styles.tabsContent}>
            <TabsContent value="active">
              <ActiveOrders />
            </TabsContent>

            <TabsContent value="archive">
              <ArchiveOrders />
            </TabsContent>
          </div>
        </Tabs>
      )}
    </div>
  );
}
