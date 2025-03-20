import ItemCard from "@components/cards/ItemCards/ItemCard/ItemCard";
import { ItemCardType } from "@/types/items/Item";
import styles from "./page.module.css";

interface PopularProps {
	items: ItemCardType[];
}

export default function Popular({ items }: PopularProps) {
	return (
		<div className={styles.wrapper}>
			{items.map((item, index) => (
				<ItemCard key={index} item={item} showFavorite={true} />
			))}
		</div>
	);
}
