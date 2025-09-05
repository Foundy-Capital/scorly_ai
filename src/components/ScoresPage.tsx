'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ScoredAsset, CategoryType } from '@/types/scoredAssets';
import { logScoresViewed, logFiltersUsed } from '@/lib/telemetry';
import { useModal } from './ModalContext';

interface Filters {
  category: string;
  chain: string;
  issuer: string;
  minScore: number;
  minTVL: number;
}

export default function ScoresPage() {
  const [items, setItems] = useState<ScoredAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    category: '',
    chain: '',
    issuer: '',
    minScore: 0,
    minTVL: 0,
  });
  const router = useRouter();
  const { openPaywall } = useModal();

  useEffect(() => {
    logScoresViewed('user1');
  }, []);

  useEffect(() => {
    fetchAssets();
  }, [filters]);

  const fetchAssets = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.chain) params.append('chain', filters.chain);
      if (filters.issuer) params.append('issuer', filters.issuer);
      if (filters.minScore > 0) params.append('minScore', filters.minScore.toString());
      if (filters.minTVL > 0) params.append('minTVL', filters.minTVL.toString());

      logFiltersUsed(filters);

      const res = await fetch(`/api/scores/assets?${params}`);
      if (res.status === 402) {
        // Open paywall modal
        openPaywall();
        return;
      }
      const data = await res.json();
      setItems(data.items);
    } catch (error) {
      console.error('Error fetching assets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: keyof Filters, value: string | number) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Scored Assets</h1>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">All</option>
            <option value="real_estate">Real Estate</option>
            <option value="credit">Credit</option>
            <option value="commodities">Commodities</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Chain</label>
          <input
            type="text"
            value={filters.chain}
            onChange={(e) => handleFilterChange('chain', e.target.value)}
            placeholder="e.g. Ethereum"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Issuer</label>
          <input
            type="text"
            value={filters.issuer}
            onChange={(e) => handleFilterChange('issuer', e.target.value)}
            placeholder="e.g. CrediCo"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Min Score</label>
          <input
            type="number"
            value={filters.minScore}
            onChange={(e) => handleFilterChange('minScore', parseFloat(e.target.value) || 0)}
            min="0"
            max="100"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Min TVL (USD)</label>
          <input
            type="number"
            value={filters.minTVL}
            onChange={(e) => handleFilterChange('minTVL', parseFloat(e.target.value) || 0)}
            min="0"
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      {/* Assets Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Token</th>
                <th className="py-2 px-4 border">Issuer</th>
                <th className="py-2 px-4 border">Category</th>
                <th className="py-2 px-4 border">Chain</th>
                <th className="py-2 px-4 border">Score</th>
                <th className="py-2 px-4 border">TVL (USD)</th>
                <th className="py-2 px-4 border">Risks</th>
              </tr>
            </thead>
            <tbody>
              {items.map((asset) => (
                <tr key={asset.id}>
                  <td className="py-2 px-4 border">{asset.token_symbol}</td>
                  <td className="py-2 px-4 border">{asset.issuer}</td>
                  <td className="py-2 px-4 border">{asset.category}</td>
                  <td className="py-2 px-4 border">{asset.chain}</td>
                  <td className="py-2 px-4 border">{asset.total_score}</td>
                  <td className="py-2 px-4 border">{asset.liquidity_tvl_usd.toLocaleString()}</td>
                  <td className="py-2 px-4 border">{asset.risk_flags.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}