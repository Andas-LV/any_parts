"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@components/ui/button";
import { categories } from "./example";
import { Category } from "@/types/Category";
import styles from "./CategoryFilter.module.css";

export default function CategoryFilter() {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(categories[0]);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <div className={styles.container}>
            <Button className={styles.categoryBtn} onClick={() => setIsOpen(!isOpen)}>
                {isOpen ?
                    <Image src="/header/X.svg" alt="Categories" width={24} height={24} />
                    :
                    <Image src="/header/category.svg" alt="Categories" width={24} height={24} />
                }
                Категории
            </Button>

            <div
                className={`${styles.backdrop} ${isOpen ? styles.backdropVisible : ""}`}
                onClick={() => setIsOpen(false)}>
                <div
                    className={`${styles.dropdown} ${isOpen ? styles.dropdownVisible : ""}`}
                    onClick={(e) => e.stopPropagation()}>
                    <div className={styles.sidebar}>
                        <h1>Запчасти для:</h1>

                        {categories.map((category) => (
                            <button
                                key={category.id}
                                className={`${styles.categoryButton} ${
                                    selectedCategory?.id === category.id ? styles.active : ""
                                }`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                <div className={styles.categoryNameContent}>
                                    <Image
                                        src={category.icon}
                                        alt={category.name}
                                        width={20}
                                        height={20}
                                    />
                                    {category.name}
                                </div>

                                <Image
                                    src={'/header/arrow-right.svg'}
                                    alt={"arrow"}
                                    width={14}
                                    height={14}
                                />
                            </button>
                        ))}
                    </div>

                    <div className={styles.content}>
                        <h2>
                            {selectedCategory?.name}
                            <span className={styles.categoryAmount}>
                                {selectedCategory?.amount}
                            </span>
                        </h2>

                        <div className={styles.subcategories}>
                            {selectedCategory?.subcategories.map((sub) => (
                                <div key={sub.title} className={styles.subcategory}>
                                    <h3>{sub.title}</h3>
                                    <ul>
                                        {sub.items.map((item) => (
                                            <li key={item}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}