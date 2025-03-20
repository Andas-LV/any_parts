import ItemCard from "@components/cards/ItemCards/ItemCard/ItemCard";
import styles from "./page.module.css";
import { ItemCardType } from "@/types/items/Item";

interface DiscountedProps {
	items: ItemCardType[];
}

export default function Discounted({ items }: DiscountedProps) {
	return (
		<div className={styles.wrapper}>
			{items.map((item, index) => (
				<ItemCard key={index} item={item} showFavorite={true} />
			))}
		</div>
	);
}
