'use client';

import { useEffect, useState } from 'react';
import { ComponentType } from 'react';
import { useRouter } from 'next/navigation';
import { useModal } from './ModalContext';
import { useAccount } from 'wagmi';

interface EntitlementResponse {
  active: boolean;
  tier: string;
  expiresAt: string;
}

export function withEntitlementGuard<T extends {}>(WrappedComponent: ComponentType<T>) {
  return function EntitlementGuardedComponent(props: T) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasAccess, setHasAccess] = useState(false);
    const router = useRouter();
    const { openPaywall } = useModal();
    const { address, isConnected } = useAccount();

    useEffect(() => {
      const checkEntitlement = async () => {
        if (!isConnected || !address) {
          openPaywall();
          setIsLoading(false);
          return;
        }

        try {
          const res = await fetch(`/api/subscriptions/me?walletAddress=${address}`);
          const data: EntitlementResponse = await res.json();
          if (data.active) {
            setHasAccess(true);
          } else {
            openPaywall();
          }
        } catch (error) {
          console.error('Error checking entitlement:', error);
          openPaywall();
        } finally {
          setIsLoading(false);
        }
      };

      checkEntitlement();
    }, [router, openPaywall, address, isConnected]);

    if (isLoading) {
      return <div className="flex justify-center items-center h-64">Loading...</div>;
    }

    if (!hasAccess) {
      return null; // Will redirect
    }

    return <WrappedComponent {...props} />;
  };
}
