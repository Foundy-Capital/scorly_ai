import React from 'react';

export default function ScoresAssetsAPIDocs() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">API Documentation: Get Scored Assets</h1>

      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">Endpoint</h2>
        <code className="bg-gray-200 px-2 py-1 rounded">GET /api/scores/assets</code>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700">
          Retrieves a list of scored assets with optional filtering. This endpoint requires user entitlement verification.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Authentication</h2>
        <p className="text-gray-700">
          Requires a valid <code>walletAddress</code> query parameter for entitlement checking.
          Users must have an active subscription to access this endpoint.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Query Parameters</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Parameter</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Required</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2"><code>walletAddress</code></td>
              <td className="border border-gray-300 px-4 py-2">string</td>
              <td className="border border-gray-300 px-4 py-2">Yes</td>
              <td className="border border-gray-300 px-4 py-2">User`s wallet address for entitlement verification</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2"><code>category</code></td>
              <td className="border border-gray-300 px-4 py-2">string</td>
              <td className="border border-gray-300 px-4 py-2">No</td>
              <td className="border border-gray-300 px-4 py-2">Filter by category: `real_estate`, `credit`, `commodities`, `other`</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2"><code>minScore</code></td>
              <td className="border border-gray-300 px-4 py-2">number</td>
              <td className="border border-gray-300 px-4 py-2">No</td>
              <td className="border border-gray-300 px-4 py-2">Minimum total score filter</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2"><code>minTVL</code></td>
              <td className="border border-gray-300 px-4 py-2">number</td>
              <td className="border border-gray-300 px-4 py-2">No</td>
              <td className="border border-gray-300 px-4 py-2">Minimum TVL (Total Value Locked) in USD</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2"><code>chain</code></td>
              <td className="border border-gray-300 px-4 py-2">string</td>
              <td className="border border-gray-300 px-4 py-2">No</td>
              <td className="border border-gray-300 px-4 py-2">Filter by blockchain chain (case-insensitive partial match)</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2"><code>issuer</code></td>
              <td className="border border-gray-300 px-4 py-2">string</td>
              <td className="border border-gray-300 px-4 py-2">No</td>
              <td className="border border-gray-300 px-4 py-2">Filter by issuer (case-insensitive partial match)</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2"><code>url</code></td>
              <td className="border border-gray-300 px-4 py-2">string</td>
              <td className="border border-gray-300 px-4 py-2">No</td>
              <td className="border border-gray-300 px-4 py-2">Filter by exact URL match</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Response</h2>
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <h3 className="font-semibold mb-2">Success Response (200)</h3>
          <pre className="bg-white p-2 rounded border overflow-x-auto">
{`{
  "items": [
    {
      "id": 1,
      "token_symbol": "USDT",
      "issuer": "Tether",
      "category": "credit",
      "chain": "Ethereum",
      "total_score": 85.5,
      "liquidity_tvl_usd": 1000000,
      "risk_flags": ["low_volatility"],
      "description": "Tether USD stablecoin",
      "full_text": "Full description...",
      "url": "https://example.com"
    }
  ],
  "total": 1
}`}
          </pre>
        </div>

        <div className="bg-red-50 p-4 rounded-lg mb-4">
          <h3 className="font-semibold mb-2 text-red-700">Error Response (402)</h3>
          <pre className="bg-white p-2 rounded border overflow-x-auto">
{`{
  "error": "Payment Required"
}`}
          </pre>
          <p className="text-red-700 mt-2">Returned when user doesn`t have an active subscription.</p>
        </div>

        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2 text-red-700">Error Response (500)</h3>
          <pre className="bg-white p-2 rounded border overflow-x-auto">
{`{
  "error": "Internal server error"
}`}
          </pre>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Example Request</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`GET /api/scores/assets?walletAddress=0x123...&category=credit&minScore=70&minTVL=500000`}
        </pre>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Data Types</h2>
        <div className="mb-4">
          <h3 className="font-semibold">CategoryType</h3>
          <pre className="bg-gray-100 p-2 rounded">
{`'real_estate' | 'credit' | 'commodities' | 'other'`}
          </pre>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold">ScoredAsset</h3>
          <pre className="bg-gray-100 p-2 rounded">
{`{
  id: number;
  token_symbol: string;
  issuer: string;
  category: CategoryType;
  chain: string;
  total_score: number;
  liquidity_tvl_usd: number;
  risk_flags: string[];
  description?: string;
  full_text?: string;
  url?: string;
}`}
          </pre>
        </div>

        <div>
          <h3 className="font-semibold">ScoredAssetsResponse</h3>
          <pre className="bg-gray-100 p-2 rounded">
{`{
  items: ScoredAsset[];
  total: number;
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}
