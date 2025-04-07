"use client";

import { Currency } from "@/types/User";
import { useState, useEffect } from "react";

export type CurrencySymbol = "₸" | "₽";

const currencySymbols: Record<Currency, CurrencySymbol> = {
	KZT: "₸",
	RUB: "₽",
};

export function useCurrencySymbol(currency: Currency) {
	const [symbol, setSymbol] = useState<CurrencySymbol>("₸");

	useEffect(() => {
		setSymbol(currencySymbols[currency] || "₸");
	}, [currency]);

	return symbol;
}
