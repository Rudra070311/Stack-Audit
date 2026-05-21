import { z } from 'zod';

export const toolSchema = z.object({
    id: z.string(),
    tool: z.string(),
    plan: z.string(),
    monthlySpend: z.number().min(0),
    seats: z.number().min(1),
});

export const auditSchema = z.object({
  tools: z.array(toolSchema).min(1),
  teamSize: z.number().min(1),
  primaryUseCase: z.enum([
    "coding",
    "writing",
    "research",
    "data",
    "mixed",
  ]),
});

export type AuditSchema = z.infer<typeof auditSchema>;