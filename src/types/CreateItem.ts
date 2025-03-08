import { z } from "zod";
import {
  characteristicsSchema,
  configurationSchema,
  generalInfoSchema,
  priceMakingSchema,
} from "@/schemas/createItem";

export type TGeneralInfoSchema = z.infer<typeof generalInfoSchema>;

export type TCharacteristicsSchema = z.infer<typeof characteristicsSchema>;

export type TConfigurationSchema = z.infer<typeof configurationSchema>;

export type TPriceMakingSchema = z.infer<typeof priceMakingSchema>;

export type TCreateItemFullInfo = TGeneralInfoSchema &
  TCharacteristicsSchema &
  TConfigurationSchema &
  TPriceMakingSchema;
