'use client';

import { Coins } from '@/components/ui/icons';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useAccount } from 'wagmi';

// Dynamically import Account component to prevent hydration mismatch
const Account = dynamic(() => import('@/components/Account').then(mod => ({ default: mod.Account })), {
  ssr: false,
  loading: () => (
    <div className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-500 rounded-lg">
      <div className="w-5 h-5 bg-gray-300 rounded"></div>
      Loading...
    </div>
  )
});

export function Header() {
  const { address } = useAccount();
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2">
              <Coins className="w-8 h-8 text-brown-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Scorly</h1>
                <p className="text-sm text-gray-600">Score Any Tokenized Real-World Asset in Seconds</p>
              </div>
            </div>
          </Link>

          <nav className="flex gap-4">
            {address && <Link href="/scores" className="text-gray-700 hover:text-gray-900">Scores</Link>}
            <Link href="/plans" className="text-gray-700 hover:text-gray-900">Plans</Link>
          </nav>

          <Account />
        </div>
      </div>
    </header>
  );
}
