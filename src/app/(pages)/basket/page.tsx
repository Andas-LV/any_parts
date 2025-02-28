"use client";

import React from "react";
import HeaderWrapper from "@/layouts/HeaderProvider";
import styles from "./page.module.css";
import { useBasketStore } from "@/entities/basket/useBasketStore";
import HeaderBlock from "@/app/(pages)/basket/headerBlock/HeaderBlock";
import OrderRegister from "@/widgets/orderRegister/OrderRegister";
import BasketCard from "@components/cards/ItemCards/BasketCard/BasketCard";

export default function Basket() {
  const { cartItems } = useBasketStore();

  return (
    <HeaderWrapper>
      <div className={styles.wrapper}>
        <h1>Корзина</h1>

        <div className={styles.content}>
          <div className={styles.cardsBlock}>
            <HeaderBlock />

            <div className={styles.cardsWrapper}>
              {cartItems.map((item, index) => (
                <BasketCard key={index} item={item} notToShare={true} />
              ))}
            </div>
          </div>

          <div className={styles.rightSection}>
            <OrderRegister type={"basket"} />
          </div>
        </div>
      </div>
    </HeaderWrapper>
  );
}
