export type Subcategory = {
	title: string;
	items: string[];
};

export type Category = {
	id: CategoryId;
	icon: string;
	name: string;
	amount: number;
	subcategories: Subcategory[];
};

export type PopularCategories = {
	value: string;
	name: string;
	image: string;
}

export type CategoryId =
	| "auto"
	| "truck"
	| "motorcycle"
	| "scooter"
	| "moped"
	| "tractor"
	| "bus"
	| "snowmobile";
