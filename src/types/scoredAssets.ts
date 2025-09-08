export type CategoryType = 'real_estate' | 'credit' | 'commodities' | 'other';

export interface ScoredAsset {
  id: string;
  token_symbol: string;
  issuer: string;
  category: CategoryType;
  chain: string;
  total_score: number;
  liquidity_tvl_usd: number;
  risk_flags: string[];
  description?: string;
}

export interface ScoredAssetsResponse {
  items: ScoredAsset[];
  total: number;
}
