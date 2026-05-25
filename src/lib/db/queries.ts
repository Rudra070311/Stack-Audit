import { db } from "./client";
import {audits, leads } from "./schema";

export async function getAllLeads() {
    return db.select().from(leads);
}

export async function getAllAudits() {
    return db.select().from(audits);
}