'use client';

import { useState, useEffect } from 'react';
import { TokenType, PlanType } from '@/types/entitlement';
import { logPaywallViewed, logPaywallCtaClicked } from '@/lib/telemetry';

interface PaywallProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function Paywall({ isOpen, onClose, onSuccess }: PaywallProps) {
  const [token, setToken] = useState<TokenType>('USDC');
  const [plan, setPlan] = useState<PlanType>('monthly');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      logPaywallViewed();
    }
  }, [isOpen]);

  const onGetAccess = async () => {
    logPaywallCtaClicked(token, plan);
    try {
      setLoading(true);
      const res = await fetch('/api/payments/mock/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, plan }),
      });
      if (!res.ok) throw new Error('Payment failed');
      // Success
      alert('Access granted!');
      onSuccess?.();
      onClose();
    } catch (e) {
      console.error(e);
      alert('Payment failed. Please try again.');
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
            <option value="monthly">Monthly (1 month)</option>
            <option value="quarterly">Quarterly (3 months)</option>
            <option value="yearly">Yearly (12 months)</option>
          </select>
        </div>

        <button
          onClick={onGetAccess}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Get access'}
        </button>
      </div>
    </div>
  );
}