"use client";

import { ItemInfoType } from "@/types/Item";
import { Icons } from "@/assets/svg";
import styles from "./actionBlock.module.css";
import { Button } from "@components/ui/button";
import dynamic from "next/dynamic";
import { useCurrencySymbol } from "@/hooks/useCurrency";
import { useUserStore } from "@/entities/user/useUserStore";

const SmallChart = dynamic(() => import("@components/Chart"), { ssr: false });

export default function ActionsBlock({ ...item }: ItemInfoType) {
  const { user } = useUserStore();

  const currencySymbol = user ? useCurrencySymbol(user.currency) : "";

  return (
    <div className={styles.actionsBlockContainer}>
      <div className={styles.prices}>
        <div className={styles.leftSidePrice}>
          <div className={styles.actualPrice}>
            {item?.currentPrice
              ? `${item.currentPrice.toLocaleString()} ${currencySymbol}`
              : `${item.price.toLocaleString()} ${currencySymbol}`}
          </div>
          {item?.currentPrice ? (
            <div className={styles.discountWrapper}>
              <div className={styles.oldPrice}>
                {item.price.toLocaleString()} {currencySymbol}
              </div>
              <div className={styles.discount}>-{item.discount}%</div>
            </div>
          ) : null}
        </div>

        <div className={styles.rightSidePrice}>
          <div className={styles.apPrice}>
            {item?.apPrice} {currencySymbol}
          </div>
          <div className={styles.apText}>c AP Кошельком</div>
        </div>
      </div>

      <div>
        <SmallChart />
      </div>

      <div className={styles.actionButtons}>
        <Button className={styles.basket}>
          <Icons.Basket width={18} height={18} />В корзину
        </Button>
        <Button className={styles.buyNow}>Купить сейчас</Button>
      </div>

      <div className={styles.marketInfo}>
        <h3>
          <Icons.StoreFront width={14} height={14} />
          {item.marketName}
        </h3>
        <div className={styles.marketRating}>
          <Icons.Star width={12} height={12} />
          {item.rating}
          <Icons.ArrowDown width={12} height={12} />
        </div>
      </div>
    </div>
  );
}
