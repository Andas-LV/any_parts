import { z } from "zod";
import { generalInfoSchema } from "@/schemas/createItem";

export type TGeneralInfoSchema = z.infer<typeof generalInfoSchema>;
