"use client";

import styles from "./headerBlock.module.css";
import { Checkbox } from "@components/ui/checkbox";
import React, { useState } from "react";
import { useBasketStore } from "@/entities/basket/useBasketStore";
import { Icons } from "@/assets/svg";
import BasketShareModal from "@/widgets/modals/basketShareModal/BasketShareModal";

export default function HeaderBlock() {
  const { cartItems, toggleSelectAll, removeSelected, selectedItems } =
    useBasketStore();

  const [showShareModal, setShowShareModal] = useState(false);

  const hasSelected = selectedItems().length > 0;

  return (
    <div className={styles.wrapper}>
      <div className={styles.actions}>
        <Checkbox
          onCheckedChange={toggleSelectAll}
          className={styles.checkbox}
          checked={
            cartItems.length > 0 && cartItems.every((item) => item.selected)
          }
        />
        <p>Выбрать все</p>
        <button
          onClick={removeSelected}
          className={styles.deleteAllBtn}
          disabled={!hasSelected}
        >
          Удалить выбранные
        </button>
      </div>

      <button
        className={styles.share}
        disabled={!hasSelected}
        onClick={() => setShowShareModal(true)}
      >
        <Icons.ShareFat width={16} height={16} />
        Поделиться
      </button>

      {showShareModal && (
        <BasketShareModal onClose={() => setShowShareModal(false)} />
      )}
    </div>
  );
}
