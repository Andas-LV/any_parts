export function filterBySearch<T>(
	data: T[],
	searchValue: string,
	fields: (keyof T)[],
): T[] {
	const lowerSearch = searchValue.toLowerCase();
	return data.filter((item) =>
		fields.some((field) => {
			const val = String(item[field] ?? "").toLowerCase();
			return val.includes(lowerSearch);
		}),
	);
}
