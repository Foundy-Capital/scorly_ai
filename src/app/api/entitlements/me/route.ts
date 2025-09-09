import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface EntitlementResponse {
  active: boolean;
  tier: string;
  expiresAt: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get('walletAddress');

    if (!walletAddress) {
      return NextResponse.json({ error: 'Wallet address is required' }, { status: 400 });
    }

    // Validate wallet address format
    if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
      return NextResponse.json({ error: 'Invalid wallet address format' }, { status: 400 });
    }

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { walletAddress: walletAddress.toLowerCase() },
    });

    if (!user) {
      // Create user if they don't exist
      user = await prisma.user.create({
        data: {
          walletAddress: walletAddress.toLowerCase(),
        },
      });
    }

    // Check for active subscription
    const activeSubscription = await prisma.subscription.findFirst({
      where: {
        userId: user.id,
        status: 'active',
        expiresAt: {
          gt: new Date(),
        },
      },
      include: {
        plan: true,
      },
    });

    const response: EntitlementResponse = {
      active: !!activeSubscription,
      tier: activeSubscription?.plan.tier || '',
      expiresAt: activeSubscription?.expiresAt.toISOString() || '',
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Entitlements error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
