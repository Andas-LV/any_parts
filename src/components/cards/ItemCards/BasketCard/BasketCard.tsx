"use client";

import styles from "./basketCard.module.css";
import { Plus, Minus } from "lucide-react";
import { ImageCarousel } from "../ImageCarousel";
import { Card } from "@components/ui/card";
import { Icons } from "@/assets/svg";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Loading from "@components/Loading";
import { CartItem, useBasketStore } from "@/entities/basket/useBasketStore";
import { Checkbox } from "@components/ui/checkbox";
import BasketCardSkeleton from "@components/skeletons/BasketCardSkeleton/BasketCardSkeleton";
import { useCurrencySymbol } from "@/hooks/useCurrency";
import { useUserStore } from "@/entities/user/useUserStore";

interface ItemCardProps {
  item: CartItem | null;
  notToShare: boolean;
}

export default function BasketCard({ item, notToShare }: ItemCardProps) {
  const router = useRouter();

  const { removeItem, updateQuantity, toggleSelect } = useBasketStore();
  const { user } = useUserStore();

  const [isFavorite, setIsFavorite] = useState(item ? item.favorite : false);

  if (!item) {
    return <BasketCardSkeleton />;
  }

  const {
    id,
    name,
    price,
    currentPrice,
    discount,
    images,
    favorite,
    quantity,
    selected,
  } = item;

  const finalPrice = currentPrice ?? price;
  const currencySymbol = useCurrencySymbol(user ? user.currency : "KZT");

  const handleMinus = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const newQty = Math.max(1, quantity - 1);
    updateQuantity(id, newQty);
  };

  const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsFavorite((prev) => !prev);
    // Логика сохранения избранного на сервере или в сторе — по желанию
  };

  return (
    <Card className={styles.card}>
      {notToShare && (
        <Checkbox
          id={String(id)}
          checked={selected}
          onCheckedChange={() => toggleSelect(id)}
          className={styles.checkbox}
        />
      )}

      <label htmlFor={String(id)} className={styles.cardContent}>
        <div className={styles.imageContainer}>
          <ImageCarousel images={images} alt={name} width={200} />
        </div>

        <div className={styles.mainInfo}>
          <div className={styles.cardHeader}>
            <div className={styles.cardName}>{name}</div>

            <div className={styles.priceContainer}>
              <div className={styles.mainPrice}>
                {finalPrice.toLocaleString()} {currencySymbol}
              </div>

              {discount && currentPrice && (
                <div className={styles.priceInfo}>
                  <span className={styles.oldPrice}>
                    {price.toLocaleString()} {currencySymbol}
                  </span>
                  <span className={styles.discount}>-{discount}%</span>
                </div>
              )}
            </div>
          </div>

          <p className={styles.colorText}>цвет: черный</p>

          <div className={styles.quantity}>{item.quantity} шт</div>

          {notToShare && (
            <div className={styles.actionButtons}>
              <button
                className={styles.favoriteButton}
                title={
                  isFavorite ? "Убрать из избранного" : "Добавить в избранное"
                }
                onClick={toggleFavorite}
              >
                {isFavorite ? <Icons.HeartFilled /> : <Icons.HeartOutline />}
              </button>

              <button
                className={styles.deleteButton}
                title="Удалить из корзины"
                onClick={() => removeItem(id)}
              >
                <Icons.Trash width={20} height={20} />
              </button>

              <button className={styles.buyButton} title="Купить сейчас">
                <Icons.Lightning width={20} height={20} />
                <p>Купить</p>
              </button>
            </div>
          )}
        </div>

        {notToShare && (
          <div className={styles.rightSideContent}>
            <div className={styles.quantityContainer}>
              <button
                className={styles.quantityActionBtn}
                onClick={handleMinus}
                disabled={quantity === 1}
              >
                <Minus />
              </button>

              <span>{quantity}</span>

              <button
                className={styles.quantityActionBtn}
                onClick={() => updateQuantity(id, quantity + 1)}
              >
                <Plus color={"var(--brand-primary)"} />
              </button>
            </div>
          </div>
        )}
      </label>
    </Card>
  );
}
