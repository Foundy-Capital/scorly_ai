import { Entitlement } from '@/types/entitlement';

// In-memory storage for MVP - in production, use database
let entitlements: Entitlement[] = [];

// Initialize with mock entitlement for development
const initializeMockEntitlement = () => {
  const now = new Date();
  const oneYearFromNow = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000).toISOString();

  const mockEntitlement: Entitlement = {
    id: 'mock_ent_001',
    userId: 'user1',
    tier: 'scor_access_pass',
    tokenSelected: 'USDT',
    plan: 'yearly',
    status: 'active',
    startedAt: now.toISOString(),
    expiresAt: oneYearFromNow,
  };

  entitlements.push(mockEntitlement);
};

// Initialize mock data
initializeMockEntitlement();

// For MVP, assume single user with ID 'user1'
const USER_ID = 'user1';

export function getEntitlement(userId: string = USER_ID): Entitlement | null {
  return entitlements.find(e => e.userId === userId && e.tier === 'scor_access_pass') || null;
}

export function createOrUpdateEntitlement(
  userId: string,
  token: 'USDT' | 'USDC' | 'SCOR',
  plan: 'monthly' | 'quarterly' | 'yearly'
): Entitlement {
  const now = new Date();
  const planDays = { monthly: 30, quarterly: 90, yearly: 365 };
  const expiresAt = new Date(now.getTime() + planDays[plan] * 24 * 60 * 60 * 1000).toISOString();

  const existing = getEntitlement(userId);
  if (existing) {
    existing.status = 'active';
    existing.expiresAt = expiresAt;
    existing.tokenSelected = token;
    existing.plan = plan;
    existing.startedAt = now.toISOString();
    return existing;
  } else {
    const newEntitlement: Entitlement = {
      id: `ent_${Date.now()}`,
      userId,
      tier: 'scor_access_pass',
      tokenSelected: token,
      plan,
      status: 'active',
      startedAt: now.toISOString(),
      expiresAt,
    };
    entitlements.push(newEntitlement);
    return newEntitlement;
  }
}

export function isEntitlementActive(userId: string = USER_ID): boolean {
  const ent = getEntitlement(userId);
  if (!ent) return false;
  return ent.status === 'active' && new Date(ent.expiresAt) > new Date();
}
