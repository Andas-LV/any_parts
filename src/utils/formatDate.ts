export function formatDate(date: Date): { date: string; linedDate: string; time: string } {
	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const year = String(date.getFullYear()).slice(-2);

	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");

	return {
		date: `${day}.${month}.${year}`,
		linedDate: `${year}-${month}-${day}`,
		time: `${hours}:${minutes}`,
	};
}

export function formatDateWithDuration(registrationDate: Date): string {
	const formattedDate = registrationDate.toISOString().slice(0, 10);
	return `${formattedDate}`;
}