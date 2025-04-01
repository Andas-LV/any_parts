import { TPartnersItem } from "@/types/partners/Items";

export type TAdminItems = Omit<TPartnersItem, "statuses"> & { status: TAdminItemsStatus };

export enum TAdminItemsStatus {
	active = "Продается",
	notActive = "Не продается",
	inRevision = "На доработке",
}