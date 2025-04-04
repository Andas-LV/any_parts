import React from "react";
import { Search as SearchIcon } from "lucide-react";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
	search: string;
	onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder: string;
	width?: string;
}

export default function SearchBar({
	search,
	onSearchChange,
	placeholder,
	width
}: SearchBarProps) {
	return (
		<div style={{width: width}} className={styles.searchWrapper}>
			<SearchIcon className={styles.searchIcon} />
			<input
				value={search}
				onChange={onSearchChange}
				type="text"
				placeholder={placeholder}
				className={styles.searchInput}
			/>
		</div>
	);
}
