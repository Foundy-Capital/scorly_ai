'use client';

import { withEntitlementGuard } from '@/components/withEntitlementGuard';
import ScoresPage from '@/components/ScoresPage';
import { Paywall } from '@/components/Paywall';
import { useModal } from '@/components/ModalContext';

const ProtectedScoresPage = withEntitlementGuard(ScoresPage);

export default function Scores() {
  const { isPaywallOpen, closePaywall } = useModal();

  return (
    <>
      <ProtectedScoresPage />
      <Paywall
        isOpen={isPaywallOpen}
        onClose={closePaywall}
        onSuccess={() => {
          // closePaywall
          // Handle success - refresh the page or update state
          // window.location.reload();
        }}
      />
    </>
  );
}
