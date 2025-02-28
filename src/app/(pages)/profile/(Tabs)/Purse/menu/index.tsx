"use client";

import Image from "next/image";
import styles from "./page.module.css";
import React, { useState } from "react";
import Payment from "@/widgets/modals/payment/Payment";
import CreateCard from "@/widgets/modals/payment/create/CreateCard";
import DeleteCard from "@/widgets/modals/payment/delete/DeleteCard";
import { usePaymentStore } from "@/entities/payment/usePaymentStore";
import { Button } from "@components/ui/button";
import { useCurrencySymbol } from "@/hooks/useCurrency";
import { useUserStore } from "@/entities/user/useUserStore";

type TPaymentModal =
  | "paymentModal"
  | "createPaymentModal"
  | "deletePaymentModal"
  | null;

export default function Menu() {
  const { balance } = usePaymentStore();
  const { user } = useUserStore();

  const [activePaymentModal, setActivePaymentModal] =
    useState<TPaymentModal>(null);

  return (
    <div className={styles.wrappersColumn}>
      <div className={styles.wrapper}>
        <h2 className={styles.balance}>
          {balance} {user && useCurrencySymbol(user.currency)}
        </h2>

        <Button
          variant={"default"}
          className={styles.navItem}
          onClick={() => setActivePaymentModal("paymentModal")}
        >
          Пополнить
        </Button>

        {activePaymentModal === "paymentModal" && (
          <Payment
            onClose={() => setActivePaymentModal(null)}
            onCreate={() => setActivePaymentModal("createPaymentModal")}
            onDelete={() => setActivePaymentModal("deletePaymentModal")}
          />
        )}

        {activePaymentModal === "createPaymentModal" && (
          <CreateCard
            onClose={() => setActivePaymentModal(null)}
            onPrev={() => setActivePaymentModal("paymentModal")}
          />
        )}

        {activePaymentModal === "deletePaymentModal" && (
          <DeleteCard
            onClose={() => setActivePaymentModal(null)}
            onPrev={() => setActivePaymentModal("paymentModal")}
          />
        )}
      </div>

      <div className={styles.wrapper}>
        <h2 className={styles.certificateTitle}>Подарочный сертификат</h2>

        <input
          type="text"
          placeholder="Введите код активации"
          className={styles.input}
        />
      </div>
    </div>
  );
}
