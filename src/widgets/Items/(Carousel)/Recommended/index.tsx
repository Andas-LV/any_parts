import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@components/ui/carousel";

import { items } from "@/exampleData/exampleItems";
import ItemCard from "@components/cards/ItemCards/ItemCard/ItemCard";

export default function RecommendedCarousel() {
  return (
    <div className="flex flex-col gap-5 my-[50px]">
      <h1 className="text-[24px] font-bold">Рекомендуем также</h1>

      <div className="w-full p-0">
        <Carousel
          opts={{
            align: "start",
            slidesToScroll: 1,
          }}
          className="relative w-full mx-auto"
        >
          <CarouselContent className="flex gap-[15px] px-[15px]">
            {items.map((item, index) => (
              <CarouselItem
                key={index}
                className="
                  p-0
                  flex-none
                  basis-[calc(20%-12px)]        /* Desktop (по умолчанию) */
                  max-[1400px]:basis-[calc(25%-12px)]
                  max-[1100px]:basis-[calc(33.333%-12px)]
                  max-[768px]:basis-[calc(50%-8px)]
                  max-[480px]:basis-[calc(100%-15px)]
                "
              >
                <ItemCard item={item} />
              </CarouselItem>
            ))}
          </CarouselContent>

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
