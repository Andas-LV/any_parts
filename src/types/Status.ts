export type StatusObject<T> = {
	name: T;
	value: keyof T;
	backgroundColor: string;
}