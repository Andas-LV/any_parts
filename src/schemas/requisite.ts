import { z } from "zod";

export const CountryValidator = z.enum(["kazakh", "russia"]);

export const RequisiteValidatorSchema = z.object({
	country: CountryValidator,
	name: z.string().min(1, "Name is required"),
	BIK: z.string().min(1, "BIK is required"),
	account: z.string().min(1, "Account is required"),
	fullName: z.string().min(1, "Full name is required"),
});
