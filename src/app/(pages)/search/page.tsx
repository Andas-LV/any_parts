import React from "react";
import { Icons } from "@/assets/svg";
import ListedCard from "@components/ItemCard/ListedCard/ListedCard";

import HeaderWrapper from "@/layouts/HeaderProvider";
import styles from './search.module.css'
import FilterSidebar from "@components/FilterSidebar/FilterSidebar";
import SearchBlock from "./RefinementBlock";
import {exampleData} from '@/exampleData/exampleFilters'
import ItemCard from "@components/ItemCard/ItemCard";
import FilteredItemsHeader from "@/app/(pages)/search/FilteredItemsHeader/FilteredItemsHeader";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@components/ui/tabs";

export default function SearchPage() {
    return(
        <HeaderWrapper>
            <div className={styles.wrapper}>
                <FilterSidebar/>
                <div className={styles.rightSideWrapper}>
                    <SearchBlock/>

                    <FilteredItemsHeader/>


                    <Tabs
                        defaultValue={"squared"}
                        className={styles.tabsContainer}
                    >
                        <div className={styles.tabsListWrapper}>
                            <TabsList className={styles.tabsList}>
                                <p>Вид списка:</p>

                                <TabsTrigger value="squared" className={styles.tabsTrigger}>
                                    <Icons.SquaresFour width={22} height={22}/>
                                </TabsTrigger>
                                <TabsTrigger value="listed" className={styles.tabsTrigger}>
                                    <Icons.List width={22} height={22}/>
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <div className={styles.tabsContent}>
                            <TabsContent value="squared">
                                <div className={styles.griddedCards}>
                                    {exampleData.map((item, index) => (
                                        <ItemCard key={index} item={item} showFavorite={true}/>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="listed">
                                <div className={styles.ListedCards}>
                                    {exampleData.map((item, index) => (
                                        <ListedCard key={index} item={item} showFavorite={true}/>
                                    ))}
                                </div>
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>
            </div>
        </HeaderWrapper>
    )
}