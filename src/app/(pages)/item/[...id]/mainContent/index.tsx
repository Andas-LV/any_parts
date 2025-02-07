"use client"

import { useState } from "react";
import { ItemInfoType } from "@/types/Item";
import ImageCarousel from "@/app/(pages)/item/[...id]/mainContent/ImageCarousel";
import ItemInfo from "@/app/(pages)/item/[...id]/mainContent/ItemInfo";
import styles from "./mainContent.module.css";
import ActionsBlock from "@/app/(pages)/item/[...id]/mainContent/ActionsBlock";

export default function MainContent({ ...item }: ItemInfoType) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <div className={styles.mainContent}>
            <ImageCarousel
                images={item.images}
                selectedIndex={selectedIndex}
                setSelectedIndexAction={setSelectedIndex}
            />
            <ItemInfo
                {...item}
                selectedIndex={selectedIndex}
                setSelectedIndexAction={setSelectedIndex}
            />
            <ActionsBlock {...item} />
        </div>
    );
}
