import styles from './headerBlock.module.css';
import { Checkbox } from "@components/ui/checkbox";
import React from "react";
import { useBasketStore } from "@/entities/basket/useBasketStore";
import { Icons } from '@/assets/svg';

export default function HeaderBlock() {
    const { cartItems, toggleSelectAll, removeSelected, selectedItems } = useBasketStore();

    const hasSelected = selectedItems().length > 0;

    return (
        <div className={styles.wrapper}>
            <div className={styles.actions}>
                <Checkbox
                    onCheckedChange={toggleSelectAll}
                    className={styles.checkbox}
                    checked={cartItems.length > 0 && cartItems.every(item => item.selected)}
                />
                <p>Выбрать все</p>
                {hasSelected && (
                    <button onClick={removeSelected} className={styles.deleteAllBtn}>
                        Удалить выбранные
                    </button>
                )}
            </div>

            {hasSelected && (
                <div className={styles.share}>
                    <Icons.ShareFat width={16} height={16}/>
                    Поделиться
                </div>
            )}
        </div>
    );
}
