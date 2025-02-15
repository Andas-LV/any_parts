"use client";

import React, { use } from "react";
import styles from "./itemPage.module.css";
import HeaderWrapper from "@/providers/HeaderProvider";
import ItemHeader from "./pageHeader/index";
import MainContent from "./mainContent";
import Details from "./details";
import RecommendedCarousel from "@/components/Items/(Carousel)/Recommended";
import PurchasedCarousel from "@/components/Items/(Carousel)/Purchased";
import { Comments } from "@/app/(pages)/item/[...id]/comments";
import { useItemsStore } from "@/store/useItemsStore";
import { useEffect } from "react";
import Loading from "@components/Loading";

export default function ItemPage({ params }: { params: Promise<{ id: string }> }) {
    const { id: idStr } = use(params);
    const id = Number(idStr);

    const { fetchItemById, currentItem } = useItemsStore();

    useEffect(() => {
        fetchItemById(id);
    }, [id]);

    const breadcrumbItems = [
        { label: "Главная", href: "/" },
        { label: "Транспорт", href: "/transport" },
        { label: "Запчасти и аксессуары", href: "/transport/accessories" },
        { label: "Аксессуары", href: "/transport/accessories/details" },
        { label: "Для салона", href: "/transport/accessories/details/salon" },
    ];

    if (!currentItem) {
        return <Loading/>;
    }

    return (
        <div>
            <HeaderWrapper>
                <div className={styles.wrapper}>
                    <ItemHeader routes={breadcrumbItems} />
                    <MainContent />
                    <RecommendedCarousel />
                    <PurchasedCarousel />
                    <Details />
                    <Comments />
                </div>
            </HeaderWrapper>
        </div>
    );
}
