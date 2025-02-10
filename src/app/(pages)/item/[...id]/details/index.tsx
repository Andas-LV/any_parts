"use client"

import React, { useState } from "react";
import styles from "./details.module.css";
import {ItemInfoType} from "@/types/Item";
import {characters as charactersSerializer} from "@/schemas/characters";

export default function Details({ ...item }: ItemInfoType) {
    const description = item.description;
    const characters = charactersSerializer(item);

    const [isExpanded, setIsExpanded] = useState(false);
    const MAX_LENGTH = 300;

    const toggleExpand = () => setIsExpanded(!isExpanded);

    return (
        <div className={styles.details}>
            <div className={styles.description}>
                <h1>Описание</h1>
                <p>
                    {isExpanded ?
                        description
                        :
                        description.slice(0, MAX_LENGTH) + (description.length > MAX_LENGTH ? "..." : "")}
                </p>
                {description.length > MAX_LENGTH && (
                    <button className={styles.toggleButton} onClick={toggleExpand}>
                        {isExpanded ? "Скрыть" : "Смотреть полностью"}
                    </button>
                )}
            </div>

            <div className={styles.characteristicsWrapper}>
                <h1>Характеристики</h1>

                <p>Title</p>

                <div className={styles.characteristics}>
                    {characters.map((characteristic, index) => (
                        <div key={index} className={styles.characteristic}>
                            <span className={styles.label}>{characteristic.name}</span>
                            <span className={styles.dots}></span>
                            <span className={styles.value}>{characteristic.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
