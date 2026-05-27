import { getResend } from "./resend";
import AuditEmail from "./templates/audit-email";

interface SendAuditParams {
    email: string;
    companyName?: string;
    role?: string;
}

export async function sendAuditEmail({
    email,
    companyName,
    role,
}: SendAuditParams) {
    const resend = getResend();
    if (!resend) {
        // No API key configured; skip sending but resolve so callers continue.
        console.warn("Resend API key not configured; skipping email send.");
        return null as any;
    }

    return resend.emails.send({
        from: "StackAudit <onboarding@resend.dev>",
        to: email,
        subject: "Your StackAudit Report",
        react: AuditEmail({
            email,
            companyName,
            role,
        }),
    });
}