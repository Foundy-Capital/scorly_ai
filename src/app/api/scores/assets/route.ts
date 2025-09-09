import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ScoredAssetsResponse, CategoryType } from '@/types/scoredAssets';

async function checkUserEntitlement(walletAddress: string): Promise<boolean> {
  try {
    if (!walletAddress) return false;

    // Find user
    const user = await prisma.user.findUnique({
      where: { walletAddress: walletAddress.toLowerCase() },
    });

    if (!user) return false;

    // Check for active subscription
    const activeSubscription = await prisma.subscription.findFirst({
      where: {
        userId: user.id,
        status: 'active',
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    return !!activeSubscription;
  } catch (error) {
    console.error('Entitlement check error:', error);
    return false;
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get('walletAddress');

    // Check user entitlement
    const hasEntitlement = await checkUserEntitlement(walletAddress || '');
    if (!hasEntitlement) {
      return NextResponse.json({ error: 'Payment Required' }, { status: 402 });
    }
    const category = searchParams.get('category');
    const minScore = searchParams.get('minScore') ? parseFloat(searchParams.get('minScore')!) : 0;
    const minTVL = searchParams.get('minTVL') ? parseFloat(searchParams.get('minTVL')!) : 0;
    const chain = searchParams.get('chain');
    const issuer = searchParams.get('issuer');
    const url = searchParams.get('url');

    const where: any = {};

    if (category) {
      where.category = category as CategoryType;
    }
    if (minScore > 0) {
      where.total_score = { gte: minScore };
    }
    if (minTVL > 0) {
      where.liquidity_tvl_usd = { gte: minTVL };
    }
    if (chain) {
      where.chain = { contains: chain, mode: 'insensitive' };
    }
    if (issuer) {
      where.issuer = { contains: issuer, mode: 'insensitive' };
    }
    if (url) {
      where.url = url;
    }

    const filteredAssets = await prisma.scoredAsset.findMany({ where });

    const response: ScoredAssetsResponse = {
      items: filteredAssets,
      total: filteredAssets.length,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Scores assets error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
