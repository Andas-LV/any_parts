"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Icons } from "@/assets/svg";
import ListedCard from "@components/cards/ItemCards/ListedCard/ListedCard";
import HeaderWrapper from "@/layouts/HeaderProvider";
import styles from "./search.module.css";
import FilterSidebar from "@/widgets/FilterSidebar/FilterSidebar";
import SearchBlock from "./RefinementBlock";
import { exampleData } from "@/exampleData/exampleFilters";
import ItemCard from "@components/cards/ItemCards/ItemCard/ItemCard";
import FilteredItemsHeader from "@/app/(pages)/search/[...search]/FilteredItemsHeader/FilteredItemsHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { itemSearchedSorts } from "@/constants/item";

export default function SearchPage({
  params,
}: {
  params: Promise<{ search: string }>;
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState(itemSearchedSorts[0].value);
  const itemsAmount = 512;
  const [searchQuery, setSearchQuery] = useState("");
  const [searchName, setSearchName] = useState("");

  const selectedSortName =
    itemSearchedSorts.find((sort) => sort.value === selectedSort)?.name ||
    "Выберите сортировку";

  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams?.get("name") || "";
    const value = searchParams?.get("search") || "";
    setSearchQuery(value);
    setSearchName(query);
  }, [searchParams]);

  return (
    <HeaderWrapper>
      <p className={styles.basicInfo}>
        По запросу «<span>{searchName}</span>» найдено {itemsAmount} товара
      </p>

      <div className={styles.wrapper}>
        <FilterSidebar />
        <div className={styles.rightSideWrapper}>
          <SearchBlock />

          <FilteredItemsHeader />

          <Tabs defaultValue={"squared"} className={styles.tabsContainer}>
            <div className={styles.tabsListWrapper}>
              <TabsList className={styles.tabsList}>
                <p>Вид списка:</p>

                <TabsTrigger value="squared" className={styles.tabsTrigger}>
                  <Icons.SquaresFour width={22} height={22} />
                </TabsTrigger>
                <TabsTrigger value="listed" className={styles.tabsTrigger}>
                  <Icons.List width={22} height={22} />
                </TabsTrigger>
              </TabsList>

              <div className={styles.filter}>
                <Icons.ArrowsDownUp />
                <DropdownMenu onOpenChange={setIsFilterOpen}>
                  <DropdownMenuTrigger className={styles.sortSelect}>
                    Сортировать по: {selectedSortName}
                    <Icons.ArrowDown
                      className={`${styles.arrowIcon} ${isFilterOpen ? styles.rotated : ""}`}
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {itemSearchedSorts.map((sort) => (
                      <DropdownMenuItem
                        key={sort.value}
                        onSelect={() => setSelectedSort(sort.value)}
                      >
                        {sort.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className={styles.tabsContent}>
              <TabsContent value="squared">
                <div className={styles.griddedCards}>
                  {exampleData.map((item, index) => (
                    <ItemCard key={index} item={item} showFavorite={true} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="listed">
                <div className={styles.ListedCards}>
                  {exampleData.map((item, index) => (
                    <ListedCard key={index} item={item} showFavorite={true} />
                  ))}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </HeaderWrapper>
  );
}
