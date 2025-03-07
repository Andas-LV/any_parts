import { z } from "zod";
import { RequisiteValidatorSchema } from "@/schemas/requisite";

export type Requisites = {
  id: number;
  name: string;
  BIK: number;
  account: number;
  fullName: string;
};

export type RequisiteValidator = z.infer<typeof RequisiteValidatorSchema>;

export type CountryValidator = "kazakh" | "russia";
