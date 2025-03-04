"use client";

import styles from "./payment.module.css";
import { Icons } from "@/assets/svg";

import Image from "next/image";
import PaymentCard from "../../../components/cards/PaymentCards";
import ModalsLayout from "@/layouts/modalLayout/layout";

const Payment = ({
  onClose,
  onCreate,
  onDelete,
}: {
  onClose: () => void;
  onCreate: () => void;
  onDelete: () => void;
}) => {
  return (
    <ModalsLayout title="Способ оплаты" onClose={onClose}>
      <PaymentCard onDelete={onDelete} />

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
