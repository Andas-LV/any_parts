export function formatDate(date: Date): { date: string; time: string } {
	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const year = String(date.getFullYear()).slice(-2);

	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");

	return {
		date: `${day}.${month}.${year}`,
		time: `${hours}:${minutes}`,
	};
}
