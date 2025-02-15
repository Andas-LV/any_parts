"use client";

import React, { useState } from "react";
import styles from "./payment.module.css";
import { Icons } from "@/assets/svg";

import Image from "next/image";
import PaymentCard from "./PaymentCards";
import CreateCard from "@components/modals/payment/create/CreateCard";
import DeleteCard from "@components/modals/payment/delete/DeleteCard";
import ModalsLayout from "@components/modals/layout";
import { PaymentCard as PaymentCardType } from "@/types/PaymentCard";

const Payment = ({onClose, onCreate, onDelete}: { onClose: () => void, onCreate: () => void, onDelete: () => void }) => {
    return (
        <ModalsLayout title="Способ оплаты" onClose={onClose}>
            <PaymentCard onDelete={onDelete}/>

            <button className={styles.navItem} onClick={onCreate}>
                <div className={styles.navHeader}>
                    <Image
                        className={styles.navImage}
                        src={"/profile/CreditCard.png"}
                        alt="navImage"
                        fill
                        sizes={"20px"}
                    />
                    <p>Привязать карту</p>
                </div>
                <Icons.ArrowRight />
            </button>

            <button className={styles.navItem}>
                <div className={styles.navHeader}>
                    <Image
                        className={styles.navImage}
                        src={"/profile/CreditCard.png"}
                        alt="navImage"
                        fill
                        sizes={"20px"}
                    />
                    <p>Привязать счёт (к примеру СБП)</p>
                </div>
                <Icons.ArrowRight />
            </button>
        </ModalsLayout>
    );
};

export default Payment;
