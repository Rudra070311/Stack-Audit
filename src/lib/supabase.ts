import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create a dummy client if env vars are missing (for build-time)
// The client will throw at runtime if actually used without proper env vars
export const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : ({} as any);

// Type definitions for database tables
export interface Lead {
  id: string;
  email: string;
  company_name?: string;
  role?: string;
  team_size?: number;
  created_at: string;
  updated_at: string;
}

export interface StoredAudit {
  id: string;
  audit_id: string;
  lead_id?: string;
  total_current_spend: number;
  total_optimized_spend: number;
  total_monthly_savings: number;
  total_annual_savings: number;
  savings_percentage: number;
  use_case: string;
  team_size: number;
  tools_data: Record<string, unknown>; // JSON data
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Save or retrieve a lead by email
 */
export async function saveLead(
  email: string,
  data: {
    company_name?: string;
    role?: string;
    team_size?: number;
  }
): Promise<Lead> {
  // First, try to find existing lead
  const { data: existing } = await supabase
    .from("leads")
    .select("*")
    .eq("email", email)
    .single();

  if (existing) {
    // Update existing lead
    const { data: updated } = await supabase
      .from("leads")
      .update({
        company_name: data.company_name || existing.company_name,
        role: data.role || existing.role,
        team_size: data.team_size || existing.team_size,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing.id)
      .select()
      .single();
    return updated as Lead;
  }

  // Create new lead
  const { data: newLead } = await supabase
    .from("leads")
    .insert([
      {
        email,
        company_name: data.company_name,
        role: data.role,
        team_size: data.team_size,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  return newLead as Lead;
}

/**
 * Store an audit result and link to a lead
 */
export async function storeAudit(
  auditData: any, // AuditResult type
  leadId?: string,
  isPublic = true
): Promise<StoredAudit> {
  const { data } = await supabase
    .from("audits")
    .insert([
      {
        audit_id: auditData.auditId,
        lead_id: leadId,
        total_current_spend: auditData.totalCurrentSpend,
        total_optimized_spend: auditData.totalOptimizedSpend,
        total_monthly_savings: auditData.totalMonthlySavings,
        total_annual_savings: auditData.totalAnnualSavings,
        savings_percentage: auditData.savingsPercentage,
        use_case: auditData.useCase,
        team_size: auditData.teamSize,
        tools_data: auditData.tools, // Store the per-tool details
        is_public: isPublic,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  return data as StoredAudit;
}

/**
 * Retrieve an audit by ID
 */
export async function getAudit(auditId: string): Promise<StoredAudit | null> {
  const { data } = await supabase
    .from("audits")
    .select("*")
    .eq("audit_id", auditId)
    .single();

  return data as StoredAudit | null;
}

/**
 * Get public audit details (sensitive info stripped)
 */
export async function getPublicAudit(
  auditId: string
): Promise<Omit<StoredAudit, "lead_id"> | null> {
  const audit = await getAudit(auditId);
  if (!audit || !audit.is_public) {
    return null;
  }

  // Return audit without lead_id
  const { lead_id, ...publicAudit } = audit;
  return publicAudit as Omit<StoredAudit, "lead_id">;
}
