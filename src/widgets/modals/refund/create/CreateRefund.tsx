import styles from "./createRefund.module.css";
import ModalsLayout from "@/layouts/modalLayout/layout";
import React, { useMemo, useState } from "react";
import { Button } from "@components/ui/button";
import { Search as SearchIcon } from "lucide-react";
import { useItemsStore } from "@/entities/items/useItemsStore";
import { RadioGroup, RadioGroupItem } from "@components/ui/radio-group";
import { useCurrencySymbol } from "@/utils/useCurrency";
import { useUserStore } from "@/entities/user/useUserStore";

export default function CreateRefund({
	onClose,
	onNext,
}: {
	onClose: () => void;
	onNext: () => void;
}) {
	const { itemInfo, setCurrentItem } = useItemsStore();
	const { user } = useUserStore();

	const [search, setSearch] = useState("");
	const [selectedItemId, setSelectedItemId] = useState<string>("");

	const filteredItems = useMemo(() => {
		return (
			itemInfo?.filter(
				(item) =>
					item.name.toLowerCase().includes(search.toLowerCase()) ||
					item.article.toString().includes(search),
			) || []
		);
	}, [search, itemInfo]);

	const handleRefund = () => {
		const selectedItem =
			itemInfo?.find((item) => item.id.toString() === selectedItemId) || null;
		if (selectedItem) {
			setCurrentItem(selectedItem);
			onNext();
		}
	};

	return (
		<ModalsLayout title="Выбор товара для возврата" onClose={onClose}>
			<div className={styles.modalContent}>
				<div className={styles.searchWrapper}>
					<SearchIcon className={styles.searchIcon} />
					<input
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						type="text"
						placeholder="Название товара или артикул"
						className={styles.searchInput}
					/>
				</div>

				<RadioGroup
					value={selectedItemId}
					onValueChange={setSelectedItemId}
					className={styles.radioGroup}
				>
					{filteredItems.length > 0 ? (
						filteredItems?.map((item) => (
							<label key={item.id} className={styles.itemLabel}>
								<RadioGroupItem
									value={item.id.toString()}
									className={styles.radioButton}
								/>
								<img
									src={item.images[0]}
									alt={item.name}
									className={styles.itemImage}
								/>
								<div className={styles.itemInfo}>
									<span className={styles.itemPrice}>
										{item.price.toLocaleString("ru-RU")}{" "}
										{user && useCurrencySymbol(user.currency)}
									</span>
									<span className={styles.itemName}>
										{item.marketName} / {item.name}
									</span>
								</div>
							</label>
						))
					) : (
						<p className={styles.noResults}>Ничего не найдено</p>
					)}
				</RadioGroup>

				<Button
					type="submit"
					className={styles.submitButton}
					onClick={handleRefund}
					disabled={!selectedItemId}
				>
					Далее
				</Button>
			</div>
		</ModalsLayout>
	);
}
