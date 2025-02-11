import {items} from "../../exampleItems";
import ItemCard from "@/components/ItemCard/ItemCard";
import styles from './page.module.css'

export default function Popular() {
    return(
        <div className={styles.wrapper}>
            {items.map((item, index) => (
                <ItemCard key={index} {...item} />
            ))}
        </div>
    )
}