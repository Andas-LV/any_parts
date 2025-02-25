"use client"

import HeaderWrapper from "@/layouts/HeaderProvider";
import styles from './page.module.css'
import {useBasketStore} from "@/entities/basket/useBasketStore";
import BasketCard from "@components/ItemCard/BasketCard/BasketCard";
import React from "react";
import HeaderBlock from "@/app/(pages)/basket/headerBlock/HeaderBlock";
import OrderRegister from "@/app/(pages)/basket/orderRegister/OrderRegister";

export default function Basket() {
    const {cartItems} = useBasketStore()

    return (
        <HeaderWrapper>
            <div className={styles.wrapper}>
                <h1>Корзина</h1>

                <div className={styles.content}>
                    <div className={styles.cardsBlock}>
                        <HeaderBlock/>

                        <div className={styles.cardsWrapper}>
                            {cartItems.map((item, index) => (
                                <BasketCard key={index} item={item}/>
                            ))}
                        </div>
                    </div>

                    <div className={styles.rightSection}>
                        <OrderRegister/>
                    </div>
                </div>
            </div>
        </HeaderWrapper>
    )
}