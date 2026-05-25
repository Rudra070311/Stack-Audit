import { createLead } from "./mutations";

async function seed() {
    await createLead({
        email: "demo@stackaudit.dev",
        companyName: "StackAudit",
        role: "Founder",
        teamSize: 5,
    });

    console.log("Database seeded.");
}
seed();