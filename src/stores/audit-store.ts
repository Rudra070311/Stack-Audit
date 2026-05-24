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
            tool: "Cursor",
            monthlySpend: 20,
            teamSize: 1,
            useCase: "coding",
        },

    result: null,

        setForm: (form) =>
            set({ form }),

        setResult: (result) =>
            set({ result }),
    }));