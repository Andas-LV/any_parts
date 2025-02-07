import {ItemInfoType} from "@/types/Item";
import ImageCarousel from "@/app/(pages)/item/[...id]/mainContent/ImageCarousel";
import ItemInfo from "@/app/(pages)/item/[...id]/mainContent/ItemInfo";
import styles from './mainContent.module.css'
import ActionsBlock from "@/app/(pages)/item/[...id]/mainContent/ActionsBlock";

export default function MainContent({...item}: ItemInfoType) {
    return(
        <div className={styles.mainContent}>
            <ImageCarousel images={item.images} />
            <ItemInfo {...item} />
            <ActionsBlock {...item} />
        </div>
    )
}