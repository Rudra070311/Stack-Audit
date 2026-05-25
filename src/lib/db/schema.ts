import {
    pgTable,
    text,
    integer,
    timestamp,
    uuid,
} from "drizzle-orm/pg-core";

export const leads =
    pgTable("leads", {
        id: uuid("id").defaultRandom().primaryKey(),
        email: text("email").notNull(),
        companyName: text("company_name"),
        role: text("role"),
        teamSize: integer("team_size"),
        createdAt: timestamp("created_at").defaultNow(),
    });

export const audits =
    pgTable("audits", {
        id: uuid("id").defaultRandom().primaryKey(),
        tool: text("tool").notNull(),
        monthlySpend: integer("monthly_spend").notNull(),
        teamSize: integer("team_size").notNull(),
        useCase: text("use_case").notNull(),
        monthlySavings:integer("monthly_savings"),
        annualSavings: integer("annual_savings"),
        createdAt: timestamp("created_at").defaultNow(),
    });