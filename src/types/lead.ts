export interface Lead {
  id?: string;
  email: string;
  companyName?: string;
  role?: string;
  teamSize?: number;
  createdAt?: string;
}

export interface LeadCapturePayload {
  email: string;
  companyName?: string;
  role?: string;
  teamSize?: number;
}

export interface LeadCaptureResponse {
  success: boolean;
  message?: string;
  error?: string;
}