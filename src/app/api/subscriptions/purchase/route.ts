import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { waitForConfirmation, TOKEN_ADDRESSES } from '@/lib/tokenTransfer';
import { logEntitlementGranted } from '@/lib/telemetry';

export async function POST(request: NextRequest) {
  try {
    const {
      walletAddress,
      planId,
      token,
      transactionHash,
      purchasePrice,
    } = await request.json();

    // Validate required fields
    if (!walletAddress || !planId || !token || !transactionHash || !purchasePrice) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate token type
    if (!['USDT', 'USDC', 'SCOR'].includes(token)) {
      return NextResponse.json({ error: 'Invalid token type' }, { status: 400 });
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

    // Find plan
    const plan = await prisma.plan.findUnique({
      where: { id: planId },
    });

    if (!plan || !plan.isActive) {
      return NextResponse.json({ error: 'Plan not found or inactive' }, { status: 404 });
    }

    // Check if user already has an active subscription for this plan
    const existingSubscription = await prisma.subscription.findFirst({
      where: {
        userId: user.id,
        planId: plan.id,
        status: 'active',
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (existingSubscription) {
      return NextResponse.json(
        { error: 'User already has an active subscription for this plan' },
        { status: 409 }
      );
    }

    // Skip transaction confirmation for mock transactions
    const isMockTransaction = transactionHash.startsWith('mock_tx_');
    let isConfirmed = true;

    if (!isMockTransaction) {
      // Wait for real transaction confirmation
      isConfirmed = await waitForConfirmation(transactionHash, 1);

      if (!isConfirmed) {
        return NextResponse.json(
          { error: 'Transaction not confirmed or failed' },
          { status: 400 }
        );
      }
    }

    // Calculate subscription dates
    const now = new Date();
    const expiresAt = new Date(now.getTime() + plan.duration * 24 * 60 * 60 * 1000);

    // Create subscription
    const subscription = await prisma.subscription.create({
      data: {
        userId: user.id,
        planId: plan.id,
        token,
        status: 'active',
        purchasePrice,
        startedAt: now,
        expiresAt,
        txHash: transactionHash,
      },
      include: {
        plan: true,
        user: true,
      },
    });

    // Log telemetry
    logEntitlementGranted(user.id, 'scor_access_pass', subscription.expiresAt.toISOString());

    return NextResponse.json({
      subscription: {
        id: subscription.id,
        status: subscription.status,
        token: subscription.token,
        purchasePrice: subscription.purchasePrice,
        startedAt: subscription.startedAt,
        expiresAt: subscription.expiresAt,
        transactionHash: subscription.txHash,
        plan: {
          id: subscription.plan.id,
          name: subscription.plan.name,
          displayName: subscription.plan.displayName,
          duration: subscription.plan.duration,
        },
      },
    });
  } catch (error) {
    console.error('Subscription purchase error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
