import { z } from "zod";

export const leadSchema = z.object({email:z.string().email(), companyName:z.string().optional(), role:z.string().optional()});