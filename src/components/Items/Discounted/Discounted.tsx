import {items} from "../exampleItems";
import ItemCard from "@/components/ItemCard/ItemCard";
import styles from './page.module.css'

export default function Discounted() {
    return(
        <div className={styles.wrapper}>
            Discounted
            {items.map((item, index) => (
                <ItemCard key={index} {...item} />
            ))}
        </div>
    )
}