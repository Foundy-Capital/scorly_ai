export function logEvent(event: string, data?: Record<string, any>) {
  console.log(`[TELEMETRY] ${event}`, {
    timestamp: new Date().toISOString(),
    ...data,
  });
}

// Specific events
export function logPaywallViewed() {
  logEvent('paywall_viewed');
}

export function logPaywallCtaClicked(token: string, plan: string) {
  logEvent('paywall_cta_clicked', { token, plan });
}

export function logMockPaymentSuccess(token: string, plan: string, userId: number) {
  logEvent('mock_payment_success', { token, plan, userId });
}

export function logEntitlementGranted(userId: number, tier: string, expiresAt: string) {
  logEvent('entitlement_granted', { userId, tier, expiresAt });
}

export function logScoresViewed(userId: number) {
  logEvent('scores_viewed', { userId });
}

export function logFiltersUsed(filters: Record<string, any>) {
  logEvent('filters_used', { filters });
}
