"use client";

import React from "react";
import styles from "./discountModal.module.css";

import { useBasketStore } from "@/entities/basket/useBasketStore";
import ModalsLayout from "@/layouts/modalLayout/layout";
import { useCurrencySymbol } from "@/hooks/useCurrency";
import { useUserStore } from "@/entities/user/useUserStore";

const DiscountModal = ({ onClose }: { onClose: () => void }) => {
  const { selectedItems, totalDiscount } = useBasketStore();
  const { user } = useUserStore();

  const discountItems = selectedItems().filter(
    (item) => item.currentPrice !== null && item.currentPrice < item.price,
  );

  return (
    <ModalsLayout title="Скидки" onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.rowsContainer}>
          {discountItems.map((item) => {
            const discountValue =
              item.quantity * (item.price - (item.currentPrice ?? item.price));
            return (
              <div className={styles.row} key={item.id}>
                <span className={styles.itemName}>
                  {item.name} ({item.quantity} шт)
                </span>

                <span className={styles.discountValue}>
                  -{discountValue.toLocaleString()}
                  {user && useCurrencySymbol(user.currency)}
                </span>
              </div>
            );
          })}
        </div>

        <div className={styles.totalRow}>
          <span className={styles.totalLabel}>Итого</span>
          <span className={styles.totalDiscount}>
            {totalDiscount() > 0 && "-"}
            {totalDiscount().toLocaleString()}
            {user && useCurrencySymbol(user.currency)}
          </span>
        </div>
      </div>
    </ModalsLayout>
  );
};

export default DiscountModal;
