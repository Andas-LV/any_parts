"use client";

import { ItemInfoType } from "@/types/Item";
import React from "react";
import styles from "./itemInfo.module.css";
import RatingStars from "@components/RatingStars";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Icons } from "@/assets/svg";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { useToast } from "@/hooks/use-toast";
import {characters as charactersSerializer} from "@/schemas/characters";

interface ItemInfoProps extends ItemInfoType {
    selectedIndex: number;
    setSelectedIndexAction: (index: number) => void;
}

export default function ItemInfo({ selectedIndex, setSelectedIndexAction, ...item }: ItemInfoProps) {
    const { toast } = useToast();

    const characters = charactersSerializer(item)

    return (
        <div className={styles.itemInfoContainer}>
            <h1>{item.name}</h1>

            <div className={styles.ratings}>
                <div className={styles.rating}>
                    {item.rating}
                    <RatingStars rating={item.rating} />
                </div>

                <div className={styles.comments}>{item.comments.amount} отзывов</div>

                <div className={styles.sold}>{item.sold} продано</div>
            </div>

            <div className={styles.linkBtns}>
                <button>Характеристики</button>
                <button>Описание</button>
            </div>

            <div className={styles.imagesOption}>
                {item.images.map((src, index) => (
                    <button
                        key={index}
                        className={cn(styles.thumbnail, { [styles.activeImage]: index === selectedIndex })}
                        onClick={() => setSelectedIndexAction(index)}
                    >
                        {src.endsWith(".mp4") || src.endsWith(".webm") ? (
                            <div className={styles.videoThumbnail}>
                                <span className={styles.playIcon}>▶</span>
                            </div>
                        ) : (
                            <Image src={src} alt={`Thumbnail ${index + 1}`} width={48} height={48} />
                        )}
                    </button>
                ))}
            </div>

            <div className={styles.characteristics}>
                {characters.map((characteristic, index) => (
                    <div key={index} className={styles.characteristic}>
                        <span className={styles.label}>{characteristic.name}</span>
                        <span className={styles.dots}></span>
                        <span className={styles.value}>
                            {characteristic.value}
                            {characteristic.name === "Артикул" && (
                                <button
                                    className={styles.copyIcon}
                                    onClick={() => copyToClipboard(characteristic.value, toast)}
                                >
                                    <Icons.Copy />
                                </button>
                            )}
                        </span>
                    </div>
                ))}
            </div>

            <button className={styles.fullCharsLink}>Все характеристики</button>
        </div>
    );
}
