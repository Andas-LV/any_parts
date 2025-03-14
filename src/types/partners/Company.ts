import { z } from "zod";
import { registerCompanySchema } from "@/schemas/partners";
import { organizationValueType, PartnerCountryValidator } from "@/types/Auth";

export type Company = {
	id: number;
	marketName: string;
	country: PartnerCountryValidator;
	organizationType: organizationValueType;
};

export type AddCompany = z.infer<typeof registerCompanySchema>;
