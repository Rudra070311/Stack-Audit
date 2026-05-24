import { z } from "zod";
export const apiResponseSchema = z .object({success: z.boolean()});