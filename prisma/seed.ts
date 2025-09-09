import { PrismaClient } from '../src/generated/prisma';
import { mockScoredAssets } from '../src/lib/mockData';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding plans...');

  const plans = [
    {
      name: 'monthly',
      displayName: 'Monthly Access',
      duration: 30,
      price: 29.99,
      tier: 'base',
      isActive: true,
    },
    {
      name: 'monthly sale',
      displayName: 'Sale Monthly Access',
      duration: 30,
      price: 29.99,
      salePrice: 22.99,
      saleStart: new Date('2025-01-01T00:00:00.000Z'),
      saleEnd: new Date('2026-01-01T00:00:00.000Z'),
      tier: 'base',
      isActive: true,
    },
    {
      name: 'quarterly',
      displayName: 'Quarterly Access',
      duration: 90,
      price: 79.99,
      tier: 'base',
      isActive: true,
    },
    {
      name: 'yearly',
      displayName: 'Yearly Access',
      duration: 365,
      price: 299.99,
      tier: 'base',
      isActive: true,
    },
  ];

  for (const plan of plans) {
    await prisma.plan.upsert({
      where: { name: plan.name },
      update: plan,
      create: plan,
    });
  }

  console.log('Seeding scored assets...');

  await prisma.scoredAsset.createMany({
    data: mockScoredAssets,
    skipDuplicates: true, // Skip if already exists
  });

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
