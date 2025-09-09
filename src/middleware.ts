import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

async function checkUserEntitlement(walletAddress: string): Promise<boolean> {
  try {
    if (!walletAddress) return false;

    // Find user
    const user = await prisma.user.findUnique({
      where: { walletAddress: walletAddress.toLowerCase() },
    });

    if (!user) return false;

    // Check for active subscription
    const activeSubscription = await prisma.subscription.findFirst({
      where: {
        userId: user.id,
        status: 'active',
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    return !!activeSubscription;
  } catch (error) {
    console.error('Entitlement check error:', error);
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Guard /api/scores/* routes
  if (pathname.startsWith('/api/scores/')) {
    // Extract wallet address from query params or headers
    const walletAddress = request.nextUrl.searchParams.get('walletAddress') ||
                         request.headers.get('x-wallet-address');

    const hasEntitlement = await checkUserEntitlement(walletAddress || '');

    if (!hasEntitlement) {
      return NextResponse.json({ error: 'Payment Required' }, { status: 402 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/scores/:path*',
};
