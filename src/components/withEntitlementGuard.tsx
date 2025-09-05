'use client';

import { useEffect, useState } from 'react';
import { ComponentType } from 'react';
import { useRouter } from 'next/navigation';
import { useModal } from './ModalContext';

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

    useEffect(() => {
      const checkEntitlement = async () => {
        try {
          const res = await fetch('/api/entitlements/me');
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
    }, [router]);

    if (isLoading) {
      return <div className="flex justify-center items-center h-64">Loading...</div>;
    }

    if (!hasAccess) {
      return null; // Will redirect
    }

    return <WrappedComponent {...props} />;
  };
}