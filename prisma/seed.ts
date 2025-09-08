import { PrismaClient } from '@prisma/client';
import { mockScoredAssets } from '../src/lib/mockData';

const prisma = new PrismaClient();

async function main() {
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
