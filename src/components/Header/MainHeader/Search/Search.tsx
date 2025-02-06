"use client"

import styles from "./search.module.css";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import { Search as SearchIcon } from 'lucide-react';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import { Icons } from "@/assets/svg";
import { useState } from "react";

export default function Search() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.searchSection}>
            <div className={styles.searchWrapper}>
                <DropdownMenu onOpenChange={setIsOpen}>
                    <DropdownMenuTrigger className={styles.categorySelect}>
                        Все
                        <Icons.ArrowDown className={`${styles.arrowIcon} ${isOpen ? styles.rotated : ""}`} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Автомобили</DropdownMenuItem>
                        <DropdownMenuItem>Запчасти</DropdownMenuItem>
                        <DropdownMenuItem>Аксессуары</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <input
                    type="text"
                    placeholder="Поиск по объявлениям"
                    className={styles.searchInput}
                />
                <SearchIcon className={styles.searchIcon}/>
            </div>
        </div>
    )
}