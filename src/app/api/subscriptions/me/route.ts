import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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

    // Find user
    const user = await prisma.user.findUnique({
      where: { walletAddress: walletAddress.toLowerCase() },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get user's subscriptions with plan details
    const subscriptions = await prisma.subscription.findMany({
      where: { userId: user.id },
      include: {
        plan: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const formattedSubscriptions = subscriptions.map(subscription => ({
      id: subscription.id,
      status: subscription.status,
      token: subscription.token,
      purchasePrice: subscription.purchasePrice,
      startedAt: subscription.startedAt,
      expiresAt: subscription.expiresAt,
      transactionHash: subscription.txHash,
      createdAt: subscription.createdAt,
      plan: {
        id: subscription.plan.id,
        name: subscription.plan.name,
        displayName: subscription.plan.displayName,
        duration: subscription.plan.duration,
        price: subscription.plan.price,
        tier: subscription.plan.tier,
      },
    }));

    return NextResponse.json({ subscriptions: formattedSubscriptions });
  } catch (error) {
    console.error('User subscriptions fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
