"use client"

import styles from './itemCard.module.css';
import { Item } from "@/types/Item";
import { ImageCarousel } from './ImageCarousel';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icons } from '@/assets/svg'
import {useRouter} from "next/navigation";

export default function ItemCard({id, name, price, currentPrice, discount, rating, comments, images}: Item) {
    const router = useRouter();

    return (
        <Card className={styles.card} onClick={() => router.push(`/item/${id}`)}>
            <ImageCarousel
                images={images}
                alt={name}
                width={250}
            />

            <div className={styles.content}>
                <div className={styles.priceContainer}>
                    <div className={styles.mainPrice}>
                        {currentPrice?.toLocaleString() || price.toLocaleString()} ₸
                    </div>

                    {discount && currentPrice && (
                        <div className={styles.priceInfo}>
                            <span className={styles.oldPrice}>
                                {price.toLocaleString()} ₸
                            </span>
                            <span className={styles.discount}>
                                {discount}%
                            </span>
                        </div>
                    )}
                </div>

                <h3 className={styles.title}>{name}</h3>

                <div className={styles.ratingWrapper}>
                    <div className={styles.rating}>
                        <Icons.Star/>
                        <span className={styles.ratingNumber}>{rating}</span>
                    </div>
                    <div className={styles.comments}>
                        <Icons.Comments/>
                        {comments}
                    </div>
                </div>

                <div className={styles.actions}>
                    <Button className={styles.cartButton}>
                        <Icons.Basket />
                        В корзину
                    </Button>

                    <button className={styles.favoriteButton}>
                        <Icons.CardFavorite className={styles.favoriteIcon}/>
                    </button>
                </div>
            </div>
        </Card>
    );
}