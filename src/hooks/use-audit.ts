"use client";

import { useState } from "react";
import type {
    AuditResult,
    AuditFormData,
} from "../types/audit";

export function useAudit() {
    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [result, setResult] =
        useState<AuditResult | null>(
        null
        );

    async function runAudit(
        data: AuditFormData
    ) {
        try {
        setLoading(true);

        setError("");

        const response =
            await fetch("/api/audit", {
            method: "POST",

            headers: {
                "Content-Type":
                "application/json",
            },

            body: JSON.stringify(data),
            });

        const json =
            await response.json();

        if (!json.success) {
            throw new Error(
            json.error
            );
        }

        setResult(json.audit);
        return json.audit;
        } catch (err) {
            console.error(err);
            setError(
                "Failed to generate audit."
            );
            } finally {
                setLoading(false);
            }
    }

    return {
        loading,
        error,
        result,
        runAudit,
    };
}