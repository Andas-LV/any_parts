"use client";

import { Currency } from "@/types/User";
import { useState, useEffect } from "react";

const currencySymbols: Record<Currency, string> = {
	KZT: "₸",
	RUB: "₽",
};

export function useCurrencySymbol(currency: Currency) {
	const [symbol, setSymbol] = useState("");

	useEffect(() => {
		setSymbol(currencySymbols[currency] || "");
	}, [currency]);

	return symbol;
}
