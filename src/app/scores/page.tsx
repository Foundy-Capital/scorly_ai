'use client'

import { withEntitlementGuard } from '@/components/withEntitlementGuard'
import ScoresPage from '@/components/ScoresPage'
import { Paywall } from '@/components/Paywall'
import { useModal } from '@/components/ModalContext'
import { useRouter } from 'next/navigation'

const ProtectedScoresPage = withEntitlementGuard(ScoresPage)

export default function Scores() {
  const { isPaywallOpen, closePaywall } = useModal()
  const router = useRouter()

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
