import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
    }

    // Find existing analysis for this URL
    const existingAsset = await prisma.scoredAsset.findFirst({
      where: { url: url },
    });

    if (!existingAsset) {
      return NextResponse.json({ found: false });
    }

    // If full_text exists, parse and return the analysis
    let analysis = null;
    if (existingAsset.full_text) {
      try {
        analysis = JSON.parse(existingAsset.full_text);
      } catch (parseError) {
        console.error('Error parsing stored analysis:', parseError);
      }
    }

    return NextResponse.json({
      found: true,
      asset: {
        id: existingAsset.id,
        token_symbol: existingAsset.token_symbol,
        issuer: existingAsset.issuer,
        category: existingAsset.category,
        chain: existingAsset.chain,
        total_score: existingAsset.total_score,
        liquidity_tvl_usd: existingAsset.liquidity_tvl_usd,
        risk_flags: existingAsset.risk_flags,
        description: existingAsset.description,
        url: existingAsset.url,
      },
      analysis: analysis,
    });
  } catch (error) {
    console.error('Check URL error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
