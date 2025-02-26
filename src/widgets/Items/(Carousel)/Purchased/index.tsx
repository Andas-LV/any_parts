import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@components/ui/carousel";
import { items } from "@/exampleData/exampleItems";
import ItemCard from "@components/ItemCard/ItemCard";

export default function PurchasedCarousel() {
    return (
        <div className="flex flex-col gap-5 my-[50px]">
            {/* Заголовок */}
            <h1 className="text-[24px] font-bold">Покупают вместе</h1>

            <div className="w-full p-0">
                <Carousel
                    opts={{
                        align: "start",
                        slidesToScroll: 1,
                    }}
                    className="relative w-full mx-auto"
                >
                    {/* Контейнер с карточками */}
                    <CarouselContent className="flex gap-[15px] px-[15px]">
                        {items.map((item, index) => (
                            <CarouselItem
                                key={index}
                                className="
                  p-0
                  flex-none
                  basis-[calc(20%-12px)]         /* 5 айтемов на больших экранах */
                  max-[1400px]:basis-[calc(25%-12px)] /* 4 айтема */
                  max-[1100px]:basis-[calc(33.333%-12px)] /* 3 айтема */
                  max-[768px]:basis-[calc(50%-8px)]    /* 2 айтема */
                  max-[480px]:basis-[calc(100%-15px)]  /* 1 айтем */
                "
                            >
                                <ItemCard item={item} showFavorite />
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {/* Кнопка «предыдущий» */}
                    <CarouselPrevious
                        className="
              bg-white
              border border-gray-200
              rounded-full
              w-10 h-10
              shadow-sm
              absolute
              top-1/2
              -translate-y-1/2
              z-10
              hover:bg-gray-50
              -left-5
            "
                    />

                    {/* Кнопка «следующий» */}
                    <CarouselNext
                        className="
              bg-white
              border border-gray-200
              rounded-full
              w-10 h-10
              shadow-sm
              absolute
              top-1/2
              -translate-y-1/2
              z-10
              hover:bg-gray-50
              -right-5
            "
                    />
                </Carousel>
            </div>
        </div>
    );
}
