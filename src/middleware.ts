import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isEntitlementActive } from '@/lib/entitlementStore';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Guard /api/scores/* routes
  if (pathname.startsWith('/api/scores/')) {
    if (!isEntitlementActive()) {
      return NextResponse.json({ error: 'Payment Required' }, { status: 402 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/scores/:path*',
};