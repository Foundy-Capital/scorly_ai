import { NextResponse } from 'next/server';
import { getEntitlement, isEntitlementActive } from '@/lib/entitlementStore';
import { EntitlementResponse } from '@/types/entitlement';

export async function GET() {
  try {
    const active = isEntitlementActive();
    const entitlement = getEntitlement();

    const response: EntitlementResponse = {
      active,
      tier: 'scor_access_pass',
      expiresAt: entitlement?.expiresAt || '',
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Entitlements error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}