"use client"

import styles from './OrderRegister.module.css';
import {Button} from "@components/ui/button";
import {useBasketStore} from "@/entities/basket/useBasketStore";
import DiscountModal from "@/widgets/modals/discount/discountModal";
import {useState} from "react";

export default function OrderRegister() {
    const { selectedItems, totalPrice, finalPrice, totalDiscount} = useBasketStore();

    const [openModal, setOpenModal] = useState(false);

    const selected = selectedItems();

    const itemsAmount = selected.length;

    return (
        <div className={styles.wrapper}>
            <Button className={styles.btn}>
                Перейти к оформлению
            </Button>

            <p className={styles.subtitle}>
                Доступные пункты выдачи можно выбрать при оформлении заказа
            </p>

            <div className={styles.cartInfo}>
                <div className={styles.row}>
                    <h3 className={styles.cartTitle}>Ваша корзина</h3>
                    <span className={styles.description}>
                        Товары
                    </span>
                </div>

                <div className={styles.row}>
                    <span>Товары ({itemsAmount})</span>
                    <span className={styles.price}>
                        {totalPrice().toLocaleString()} ₸
                    </span>
                </div>

                <div className={styles.row}>
                    <span>Скидка</span>
                    <span className={styles.discount}>
                        {totalDiscount() > 0 && "-"}
                        {totalDiscount().toLocaleString()} ₸
                    </span>
                </div>

                <button onClick={() => setOpenModal(true)} className={styles.detailsLink}>
                    Подробнее
                </button>
            </div>

            <div className={styles.row}>
                <span className={styles.total}>
                    Общая стоимость
                </span>

                <span className={styles.total}>
                    {finalPrice().toLocaleString()} ₸
                </span>
            </div>

            {openModal && <DiscountModal onClose={() => setOpenModal(false)} />}
        </div>
    );
}
