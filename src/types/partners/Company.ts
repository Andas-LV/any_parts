import { z } from "zod";
import { registerCompanySchema } from "@/schemas/partners";
import { organizationValueType, PartnerCountryValidator } from "@/types/Auth";

export type Company = {
	id: number;
	marketName: string;
	country: PartnerCountryValidator;
	organizationType: organizationValueType;
};

export type TreatmentType = {
	treatmentName: string;
	marketName: string;
	treatmentDate: string;
	companyAccount: number;
	bankBIC: string;
	bankName: string;
	bankAddress: string;
};

export type AddCompany = z.infer<typeof registerCompanySchema>;
