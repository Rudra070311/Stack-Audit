import { db } from "./client";
import { audits, leads } from "./schema";

interface CreateLeadParams {
    email: string;
    companyName?: string;
    role?: string;
    teamSize?: number;
}

export async function createLead({
    email,
    companyName,
    role,
    teamSize,
}: CreateLeadParams) {
    return db.insert(leads).values({
        email,
        companyName,
        role,
        teamSize,
    });
}

interface CreateAuditParams {
    tool: string;
    monthlySpend: number;
    teamSize: number;
    useCase: string;
    monthlySavings?: number;
    annualSavings?: number;
}

export async function createAudit({
    tool,
    monthlySpend,
    teamSize,
    useCase,
    monthlySavings,
    annualSavings,
}: CreateAuditParams) {
    return db.insert(audits).values({
        tool,
        monthlySpend,
        teamSize,
        useCase,
        monthlySavings,
        annualSavings,
    });
}