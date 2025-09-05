import { NextRequest, NextResponse } from 'next/server';
import { mockScoredAssets } from '@/lib/mockData';
import { isEntitlementActive } from '@/lib/entitlementStore';
import { ScoredAssetsResponse } from '@/types/scoredAssets';

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

    let filteredAssets = mockScoredAssets;

    if (category) {
      filteredAssets = filteredAssets.filter(asset => asset.category === category);
    }
    if (minScore > 0) {
      filteredAssets = filteredAssets.filter(asset => asset.total_score >= minScore);
    }
    if (minTVL > 0) {
      filteredAssets = filteredAssets.filter(asset => asset.liquidity_tvl_usd >= minTVL);
    }
    if (chain) {
      filteredAssets = filteredAssets.filter(asset => asset.chain.toLowerCase().includes(chain.toLowerCase()));
    }
    if (issuer) {
      filteredAssets = filteredAssets.filter(asset => asset.issuer.toLowerCase().includes(issuer.toLowerCase()));
    }

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