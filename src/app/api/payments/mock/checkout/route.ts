import { NextRequest, NextResponse } from 'next/server';
import { createOrUpdateEntitlement } from '@/lib/entitlementStore';
import { MockCheckoutRequest, MockCheckoutResponse } from '@/types/entitlement';
import { logMockPaymentSuccess, logEntitlementGranted } from '@/lib/telemetry';

export async function POST(request: NextRequest) {
  try {
    const body: MockCheckoutRequest = await request.json();

    // Validate token and plan
    const validTokens = ['USDT', 'USDC', 'SCOR'];
    const validPlans = ['monthly', 'quarterly', 'yearly'];

    if (!validTokens.includes(body.token) || !validPlans.includes(body.plan)) {
      return NextResponse.json({ error: 'Invalid token or plan' }, { status: 400 });
    }

    // Simulate payment success and create/update entitlement
    const entitlement = createOrUpdateEntitlement('user1', body.token, body.plan);

    const response: MockCheckoutResponse = {
      status: 'success',
      entitlement: {
        tier: entitlement.tier,
        status: entitlement.status as 'active',
        expiresAt: entitlement.expiresAt,
      },
    };

    // Log telemetry
    logMockPaymentSuccess(body.token, body.plan, 'user1');
    logEntitlementGranted('user1', entitlement.tier, entitlement.expiresAt);

    return NextResponse.json(response);
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}