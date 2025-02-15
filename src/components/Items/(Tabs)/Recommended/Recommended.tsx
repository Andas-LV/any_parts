import {items} from "../../exampleItems";
import ItemCard from "@components/ItemCard/ItemCard";
import styles from './page.module.css'

export default function Recommended() {
    return(
        <div className={styles.wrapper}>
            Recommended
            {items.map((item, index) => (
                <ItemCard
                    key={index}
                    item={item}
                    showFavorite={true}
                />
            ))}
        </div>
    )
}