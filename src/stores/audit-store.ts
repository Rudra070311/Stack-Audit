import { create } from "zustand";

import type {
    AuditResult,
    AuditFormData,
} from "../types/audit";

interface AuditStore {
    form: AuditFormData;
    result: AuditResult | null;
    setForm: (
        form: AuditFormData
    ) => void;

    setResult: (
        result: AuditResult
    ) => void;
}

export const useAuditStore =
    create<AuditStore>((set) => ({
        form: {
            tools: [
                {
                    name: "Cursor",
                    plan: "Pro",
                    monthlySpend: 20,
                    seats: 1,
                }
            ],
            teamSize: 1,
            useCase: "coding",
        },

    result: null,

        setForm: (form) =>
            set({ form }),

        setResult: (result) =>
            set({ result }),
    }));