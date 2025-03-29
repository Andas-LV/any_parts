"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from "@components/ui/select";
import styles from "./CountryFilter.module.css";
import { countryOptions, TMarketsCountry } from "@/types/admin/Markets";
import { useAdminMarketsStore } from "@/entities/admin/markets/useAdminMarketsStore";

type OptionValue = "all" | keyof typeof TMarketsCountry;

export default function CountryFilter() {
	const { filterCountry, setFilterCountry } = useAdminMarketsStore();

	const selectedKey: OptionValue = filterCountry
		? ((Object.keys(TMarketsCountry).find(
			(key) =>
				TMarketsCountry[key as keyof typeof TMarketsCountry] === filterCountry
		) as OptionValue) || "all")
		: "all";

	return (
		<div className={styles.filter}>
			<Select
				value={selectedKey}
				onValueChange={(value) => {
					const countryKey = value as OptionValue;
					if (countryKey === "all") {
						setFilterCountry(null);
					} else {
						setFilterCountry(TMarketsCountry[countryKey]);
					}
				}}
			>
				<SelectTrigger className={styles.countrySelect}>
					{selectedKey === "all"
						? "Все страны"
						: TMarketsCountry[selectedKey]}
				</SelectTrigger>
				<SelectContent>
					{countryOptions.map((option, index) => (
						<SelectItem value={option.value as TMarketsCountry} key={index}>
							{option.name}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
