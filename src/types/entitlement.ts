export type TokenType = 'USDT' | 'USDC' | 'SCOR';
export type PlanType = 'monthly' | 'quarterly' | 'yearly';
export type EntitlementStatus = 'active' | 'expired' | 'revoked';

export interface Entitlement {
  id: string;
  userId: string;
  tier: 'scor_access_pass';
  tokenSelected: TokenType;
  plan: PlanType;
  status: EntitlementStatus;
  startedAt: string;
  expiresAt: string;
  notes?: string;
}

export interface EntitlementResponse {
  active: boolean;
  tier: 'scor_access_pass';
  expiresAt: string;
}

export interface MockCheckoutRequest {
  token: TokenType;
  plan: PlanType;
}

export interface MockCheckoutResponse {
  status: 'success';
  entitlement: {
    tier: 'scor_access_pass';
    status: 'active';
    expiresAt: string;
  };
}
