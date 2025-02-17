import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@components/ui/carousel";

import { items } from "@/exampleData/exampleItems";
import ItemCard from "@components/ItemCard/ItemCard";
import styles from "./page.module.css";

export default function PurchasedCarousel() {
    return (
        <div className={styles.container}>
            <h1>Покупают вместе</h1>

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
                                <ItemCard item={item} showFavorite={true}/>
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