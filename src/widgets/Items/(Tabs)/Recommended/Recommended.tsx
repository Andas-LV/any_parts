import { ItemCardType } from "@/types/items/Item";
import styles from "./page.module.css";
import ItemCard from "@components/cards/ItemCards/ItemCard/ItemCard";

interface RecommendedProps {
	items: ItemCardType[];
}

export default function Recommended({ items }: RecommendedProps) {
	return (
		<div className={styles.wrapper}>
			{items.map((item, index) => (
				<ItemCard key={index} item={item} showFavorite={true} />
			))}
		</div>
	);
}
