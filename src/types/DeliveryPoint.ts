export type DeliveryPoint = {
	id: number;
	address: string;
	workingTime: OperatingHours;
	coordinates: Coordinates;
}

export interface OperatingHours {
	days: string;
	open: string;
	close: string;
}

export type Coordinates = {
	lat: number;
	lng: number;
}