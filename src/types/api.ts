import { AuditResult } from "../lib/audit-engine/types";

export interface ApiSuccess<T> {
    success: true;
    data: T;
}

export interface ApiError {
    success: false;
    error: string;
}

export type ApiResponse<T> =
    | ApiSuccess<T>
    | ApiError;

export interface AuditApiRequest {
    tool: string;
    monthlySpend: number;
    teamSize: number;
    useCase: string;
}

export interface AuditApiResponse {
    success: boolean;
    audit?: AuditResult;
    error?: string;
}

export interface HealthApiResponse {
    success: boolean;
    message: string;
    timestamp: string;
}