import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const plans = await prisma.plan.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        duration: 'asc',
      },
    });

    const formattedPlans = plans.map(plan => ({
      id: plan.id,
      name: plan.name,
      displayName: plan.displayName,
      duration: plan.duration,
      price: plan.price,
      salePrice: plan.salePrice,
      saleStart: plan.saleStart,
      saleEnd: plan.saleEnd,
      tier: plan.tier,
      isActive: plan.isActive,
    }));

    return NextResponse.json({ plans: formattedPlans });
  } catch (error) {
    console.error('Plans fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
