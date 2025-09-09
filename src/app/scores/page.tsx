'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ScoredAsset, CategoryType } from '@/types/scoredAssets'
import { logScoresViewed, logFiltersUsed } from '@/lib/telemetry'
import { useModal } from '@/components/ModalContext'
import { useAccount } from 'wagmi'
import { withEntitlementGuard } from '@/components/withEntitlementGuard'
import { Paywall } from '@/components/Paywall'

interface Filters {
  category: string
  chain: string
  issuer: string
  minScore: number
  minTVL: number
}

function ScoresPage() {
  const [items, setItems] = useState<ScoredAsset[]>([])
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<number | null>(null)
  const [filters, setFilters] = useState<Filters>({
    category: '',
    chain: '',
    issuer: '',
    minScore: 0,
    minTVL: 0,
  })
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState<ScoredAsset | null>(null)
  const [assetDetails, setAssetDetails] = useState<any>(null)

  const { openPaywall } = useModal()
  const { address } = useAccount()

  useEffect(() => {
    const getUserId = async () => {
      if (address) {
        try {
          const response = await fetch(`/api/auth/user?walletAddress=${address}`)
          if (response.ok) {
            const data = await response.json()
            setUserId(data.user.id)
            logScoresViewed(data.user.id)
          }
        } catch (error) {
          console.error('Error fetching user:', error)
        }
      }
    }

    getUserId()
  }, [address])

  const fetchAssets = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (filters.category) params.append('category', filters.category)
      if (filters.chain) params.append('chain', filters.chain)
      if (filters.issuer) params.append('issuer', filters.issuer)
      if (filters.minScore > 0) params.append('minScore', filters.minScore.toString())
      if (filters.minTVL > 0) params.append('minTVL', filters.minTVL.toString())

      // Add wallet address for entitlement check
      if (address) {
        params.append('walletAddress', address)
      }

      logFiltersUsed(filters)

      const res = await fetch(`/api/scores/assets?${params}`)
      if (res.status === 402) {
        // Open paywall modal
        openPaywall()
        return
      }
      const data = await res.json()
      setItems(data.items)
    } catch (error) {
      console.error('Error fetching assets:', error)
    } finally {
      setLoading(false)
    }
  }

  // Initial data fetch on component mount
  useEffect(() => {
    fetchAssets()
  }, [address])

  // Fetch data when filters change
  useEffect(() => {
    fetchAssets()
  }, [filters, address])

  const handleFilterChange = (key: keyof Filters, value: string | number) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleOpenDetails = async (asset: ScoredAsset) => {
    setSelectedAsset(asset)

    // If asset already has full_text, parse it directly
    if (asset.full_text) {
      try {
        const analysis = JSON.parse(asset.full_text)
        setAssetDetails(analysis)
      } catch (error) {
        console.error('Error parsing stored analysis:', error)
      }
    } else if (asset.url) {
      // Fallback: fetch from API if no full_text
      try {
        const response = await fetch(`/api/scores/check-url?url=${encodeURIComponent(asset.url)}`)
        if (response.ok) {
          const data = await response.json()
          if (data.found && data.analysis) {
            setAssetDetails(data.analysis)
          }
        }
      } catch (error) {
        console.error('Error fetching asset details:', error)
      }
    }

    setIsDetailModalOpen(true)
  }

  const handleCloseDetails = () => {
    setIsDetailModalOpen(false)
    setSelectedAsset(null)
    setAssetDetails(null)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
                <th className="py-2 px-4 border">Details</th>
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
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => handleOpenDetails(asset)}
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Open
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail Modal */}
      {isDetailModalOpen && selectedAsset && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full h-full relative overflow-auto">
            <button
              onClick={handleCloseDetails}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl z-10"
            >
              ×
            </button>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Full Analysis Report</h2>
              {assetDetails ? (
                <div className="space-y-6">
                  {/* Asset Details */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2 border-b pb-2">Asset Details</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <p><strong>Asset:</strong> {assetDetails.asset_name}</p>
                      <p><strong>Token:</strong> {assetDetails.token}</p>
                      <p><strong>Type:</strong> {assetDetails.asset_type}</p>
                      <p><strong>Issuer:</strong> {assetDetails.issuer}</p>
                      <p><strong>Chain:</strong> {assetDetails.chain}</p>
                    </div>
                  </div>

                  {/* Index Inclusion Score */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2 border-b pb-2">Index Inclusion Score</h3>
                    <div className="flex items-center gap-4">
                      <p className="font-semibold text-lg">{assetDetails.index_inclusion_score.eligibility}</p>
                      <p className={`font-semibold text-lg ${
                        assetDetails.index_inclusion_score.score_percent > 80
                          ? 'text-green-500'
                          : assetDetails.index_inclusion_score.score_percent > 50
                          ? 'text-yellow-500'
                          : 'text-red-500'
                      }`}>
                        Score: {assetDetails.index_inclusion_score.score_percent}
                      </p>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2 border-b pb-2">Key Highlights</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <h4 className="font-semibold mb-1">Top Strengths</h4>
                        <ul className="list-disc list-inside">
                          {assetDetails.key_highlights.top_strengths.map((s: string, i: number) => <li key={i}>{s}</li>)}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Key Risks</h4>
                        <ul className="list-disc list-inside">
                          {assetDetails.key_highlights.key_risks.map((r: string, i: number) => <li key={i}>{r}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Risk Analysis */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2 border-b pb-2">Risk Analysis</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Regulatory:</strong> {assetDetails.risk_analysis.regulatory}</p>
                      <p><strong>Custody:</strong> {assetDetails.risk_analysis.custody}</p>
                      <p><strong>Oracle/Data:</strong> {assetDetails.risk_analysis.oracle_data}</p>
                      <p><strong>Redemption:</strong> {assetDetails.risk_analysis.redemption}</p>
                      <p><strong>Token Design:</strong> {assetDetails.risk_analysis.token_design}</p>
                    </div>
                  </div>

                  {/* Final Verdict */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2 border-b pb-2">Final Verdict</h3>
                    <div className="p-4 rounded-lg bg-gray-100">
                      <p className="font-bold text-lg mb-2">{assetDetails.final_verdict.decision}</p>
                      <ul className="list-disc list-inside text-sm">
                        {assetDetails.final_verdict.reasoning.map((r: string, i: number) => <li key={i}>{r}</li>)}
                      </ul>
                    </div>
                  </div>

                  {/* Documents */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2 border-b pb-2">Documents</h3>
                    <div className="p-4 rounded-lg bg-gray-100">
                      <p><strong>All Documents:</strong> <a target='_blank' href={assetDetails.all_documents} className="text-blue-600 hover:underline">Open Dropbox</a></p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">Loading analysis details...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const ProtectedScoresPage = withEntitlementGuard(ScoresPage)

export default function Scores() {
  const { isPaywallOpen, closePaywall } = useModal()

  const handlePaywallClose = () => {
    window.location.href = '/'
  }

  return (
    <>
      <ProtectedScoresPage />
      <Paywall
        isOpen={isPaywallOpen}
        onClose={handlePaywallClose}
        onSuccess={() => {
          closePaywall()
          // Refresh the page to re-check entitlements
          window.location.reload()
        }}
      />
    </>
  )
}
