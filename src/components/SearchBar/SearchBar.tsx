import React from "react";
import { Search as SearchIcon } from "lucide-react";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
	search: string;
	onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder: string;
}

export default function SearchBar({
	search,
	onSearchChange,
	placeholder,
}: SearchBarProps) {
	return (
		<div className={styles.searchWrapper}>
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
