import { items } from "@/exampleData/exampleItems";
import ItemCard from "@components/cards/ItemCards/ItemCard/ItemCard";
import styles from "./page.module.css";

export default function Recommended() {
  return (
    <div className={styles.wrapper}>
      Recommended
      {items.map((item, index) => (
        <ItemCard key={index} item={item} showFavorite={true} />
      ))}
    </div>
  );
}
