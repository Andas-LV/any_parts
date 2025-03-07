import { z } from "zod";
import {
  characteristicsSchema,
  configurationSchema,
  generalInfoSchema,
} from "@/schemas/createItem";

export type TGeneralInfoSchema = z.infer<typeof generalInfoSchema>;

export type TCharacteristicsSchema = z.infer<typeof characteristicsSchema>;

export type TConfigurationSchema = z.infer<typeof configurationSchema>;

export type TCreateItemFullInfo = TGeneralInfoSchema &
  TCharacteristicsSchema &
  TConfigurationSchema;
