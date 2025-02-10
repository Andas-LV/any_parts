// RecommendedCarousel.jsx
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

import { items } from "@components/Items/exampleItems";
import ItemCard from "@/components/ItemCard/ItemCard";
import styles from "./page.module.css";

export default function RecommendedCarousel() {
    return (
        <div className={styles.container}>
            <h1>Рекомендуем также</h1>

            <div className={styles.wrapper}>
                <Carousel
                    opts={{
                        align: "start",
                        slidesToScroll: 1,
                    }}
                    className={styles.carousel}
                >
                    <CarouselContent className={styles.carouselContent}>
                        {items.map((item, index) => (
                            <CarouselItem key={index} className={styles.carouselItem}>
                                <ItemCard {...item} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className={styles.carouselButton}/>
                    <CarouselNext className={styles.carouselButton}/>
                </Carousel>
            </div>
        </div>
    );
}