'use client';

import { useState, useEffect } from 'react';
import { TokenType, PlanType } from '@/types/entitlement';
import { logPaywallViewed, logPaywallCtaClicked } from '@/lib/telemetry';
import { useAccount } from 'wagmi';

interface Plan {
  id: string;
  name: string;
  displayName: string;
  duration: number;
  price: number;
  salePrice: number | null;
  tier: string;
}

interface PaywallProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function Paywall({ isOpen, onClose, onSuccess }: PaywallProps) {
  const [token, setToken] = useState<TokenType>('USDC');
  const [plan, setPlan] = useState<PlanType>('monthly');
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const { address } = useAccount();

  useEffect(() => {
    if (isOpen) {
      logPaywallViewed();
      fetchPlans();
    }
  }, [isOpen]);

  useEffect(() => {
    if (plans.length > 0) {
      const currentPlan = plans.find(p => p.name === plan);
      setSelectedPlan(currentPlan || null);
    }
  }, [plan, plans]);

  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/plans');
      if (response.ok) {
        const data = await response.json();
        setPlans(data.plans);
      }
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  const onGetAccess = async () => {
    if (!address) {
      alert('Please connect your wallet first');
      return;
    }

    if (!selectedPlan) {
      alert('Plan not found');
      return;
    }

    logPaywallCtaClicked(token, plan);

    try {
      setLoading(true);

      // Create mock transaction data
      const mockTransactionHash = `mock_tx_${Date.now()}`;
      const purchasePrice = selectedPlan.salePrice || selectedPlan.price;

      const res = await fetch('/api/subscriptions/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          walletAddress: address,
          planId: selectedPlan.id,
          token,
          transactionHash: mockTransactionHash,
          purchasePrice,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Subscription creation failed');
      }

      const data = await res.json();

      // Success
      alert('Subscription created successfully! Access granted.');
      onSuccess?.();
      onClose();
    } catch (e) {
      console.error(e);
      alert(`Subscription failed: ${e instanceof Error ? e.message : 'Please try again.'}`);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4">Unlock All Scored Assets</h2>
        <ul className="mb-6 space-y-2">
          <li>• Full database access</li>
          <li>• Advanced filters</li>
          <li>• Regular updates</li>
        </ul>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Select Token</label>
          <select
            value={token}
            onChange={(e) => setToken(e.target.value as TokenType)}
            className="w-full p-2 border rounded"
          >
            <option value="USDT">USDT</option>
            <option value="USDC">USDC</option>
            <option value="SCOR">SCOR</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Select Plan</label>
          <select
            value={plan}
            onChange={(e) => setPlan(e.target.value as PlanType)}
            className="w-full p-2 border rounded"
          >
            {plans.map((p) => (
              <option key={p.id} value={p.name}>
                {p.displayName} - ${(p.salePrice || p.price).toFixed(2)}
                {p.salePrice && <span className="text-green-600 ml-2">(Sale!)</span>}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={onGetAccess}
          disabled={loading || !address}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Processing...' :
           !address ? 'Connect Wallet First' :
           selectedPlan ? `Subscribe for $${(selectedPlan.salePrice || selectedPlan.price).toFixed(2)}` :
           'Get access'}
        </button>
      </div>
    </div>
  );
}
