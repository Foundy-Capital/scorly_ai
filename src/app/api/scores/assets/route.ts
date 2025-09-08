import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isEntitlementActive } from '@/lib/entitlementStore';
import { ScoredAssetsResponse, CategoryType } from '@/types/scoredAssets';

export async function GET(request: NextRequest) {
  try {
    // Check entitlement
    if (!isEntitlementActive()) {
      return NextResponse.json({ error: 'Payment Required' }, { status: 402 });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const minScore = searchParams.get('minScore') ? parseFloat(searchParams.get('minScore')!) : 0;
    const minTVL = searchParams.get('minTVL') ? parseFloat(searchParams.get('minTVL')!) : 0;
    const chain = searchParams.get('chain');
    const issuer = searchParams.get('issuer');

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
