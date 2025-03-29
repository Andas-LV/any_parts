import {
	addressRegisterSchema,
	checkDataSchema,
	documentSchema, OrganizationType,
	requisitesSchema
} from "@/schemas/partners";
import { z } from "zod";

export type TCheckData = z.infer<typeof checkDataSchema>;
export type TAddressRegister = z.infer<typeof addressRegisterSchema>;
export type TDocumentType = z.infer<typeof documentSchema>;
export type TRequisites = z.infer<typeof requisitesSchema>;

export type TOrganizationType = z.infer<typeof OrganizationType>;

export type TSignUp = TCheckData &
	TAddressRegister &
	TDocumentType &
	TRequisites;
