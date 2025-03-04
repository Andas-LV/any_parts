import { organizationValueType, PartnerCountryValidator } from "@/types/Auth";

export type Company = {
  id: number;
  marketName: string;
  country: PartnerCountryValidator;
  organizationType: organizationValueType;
};

export type AddCompany = {
  marketName: string;
  country: PartnerCountryValidator;
  organizationType: organizationValueType;
};
