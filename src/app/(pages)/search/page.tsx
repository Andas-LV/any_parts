import HeaderWrapper from "@/layouts/HeaderProvider";
import styles from './search.module.css'
import FilterSidebar from "@components/FilterSidebar/FilterSidebar";
import SearchBlock from "@/app/(pages)/search/SearchBlock";
import {exampleData} from '@/exampleData/exampleFilters'
import ItemCard from "@components/ItemCard/ItemCard";

export default function SearchPage() {
    return(
        <HeaderWrapper>
            <div className={styles.wrapper}>
                <FilterSidebar/>
                <div className={styles.rightSideWrapper}>
                    <SearchBlock/>

                    <div className={styles.griddedCards}>
                        {exampleData.map((item, index) => (
                            <ItemCard key={index} item={item} showFavorite={true}/>
                        ))}
                    </div>
                </div>
            </div>
        </HeaderWrapper>
    )
}