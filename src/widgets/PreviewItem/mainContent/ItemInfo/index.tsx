import { Button } from "@components/ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "@/assets/svg";
import { copyToClipboard } from "@components/copyToClipboard";
import { useToast } from "@/hooks/use-toast";
import { charactersSerializer } from "@/types/items/charactersSerializer";
import styles from "./itemInfo.module.css";
import { TCreateItemFullInfo } from "@/types/items/CreateItem";
import { renderThumbnail } from "@/utils/renderThumbnail";

interface ItemInfoProps {
	item: TCreateItemFullInfo;
	selectedColorIndex: number;
	setSelectedColorIndex: (index: number) => void;
	selectedSizeIndex: number;
	setSelectedSizeIndex: (index: number) => void;
}

export default function ItemInfo({
	item,
	selectedColorIndex,
	setSelectedColorIndex,
	selectedSizeIndex,
	setSelectedSizeIndex,
}: ItemInfoProps) {
	const { toast } = useToast();
	const characters = charactersSerializer(item);

	const images = [...item.images, ...item.colors.map((color) => color.photo)];

	const selectColor = (index: number) => {
		setSelectedColorIndex(index);
		setSelectedSizeIndex(0); // сбрасываем размер на первый при смене цвета
	};

	const selectSize = (index: number) => {
		setSelectedSizeIndex(index);
	};

	const selectedColor = item.prices[selectedColorIndex];

	return (
		<div className={styles.itemInfoContainer}>
			<h1>{item.productName}</h1>

			<div className={styles.linkBtns}>
				<button>Характеристики</button>
				<button>Описание</button>
			</div>

			<div className={styles.imagesOption}>
				{images.map((src, index) => (
					<button
						key={index}
						className={cn(styles.thumbnail, {
							[styles.activeImage]: index === selectedSizeIndex,
						})}
						onClick={() => setSelectedSizeIndex(index)}
					>
						{renderThumbnail(src, index)}
					</button>
				))}
			</div>

			<h3>Цвет</h3>
			<div className={styles.options}>
				{item.colors.map((color, i) => (
					<Button
						key={i}
						variant={i === selectedColorIndex ? "default" : "ghost"}
						onClick={() => selectColor(i)}
						className={cn(styles.optionBtn, {
							[styles.activeOption]: i === selectedColorIndex,
						})}
					>
						{color.colorName}
					</Button>
				))}
			</div>

			<h3>Размер</h3>
			<div className={styles.options}>
				{selectedColor?.sizes.map((size, i) => (
					<Button
						key={i}
						variant={i === selectedSizeIndex ? "default" : "ghost"}
						onClick={() => selectSize(i)}
						className={cn(styles.optionBtn, {
							[styles.activeOption]: i === selectedSizeIndex,
						})}
					>
						{size.sizeName}
					</Button>
				))}
			</div>

			<div className={styles.characteristics}>
				{characters.map((char, index) => (
					<div key={index} className={styles.characteristic}>
						<span className={styles.label}>{char.name}</span>
						<span className={styles.dots} />
						<span className={styles.value}>
							{char.value}
							{char.name === "Артикул" && (
								<button
									className={styles.copyIcon}
									onClick={() => copyToClipboard(char.value, toast)}
								>
									<Icons.Copy />
								</button>
							)}
						</span>
					</div>
				))}
			</div>

			<Button variant="link" className={styles.fullCharsLink}>
				Все характеристики
			</Button>
		</div>
	);
}
