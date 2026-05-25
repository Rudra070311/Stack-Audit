import { resend } from "./resend";
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