import { PrismaClient } from '@prisma/client'
import { seedImages } from './images.seed'

const prisma = new PrismaClient()

async function main() {
  // await prisma.$executeRaw`TRUNCATE TABLE "makes" RESTART IDENTITY CASCADE`;
  // await prisma.$executeRaw`TRUNCATE TABLE "classifieds" RESTART IDENTITY CASCADE`;
  // await seedAdmin(prisma)
  // await seedTaxonomy(prisma)
  // await seedClassifieds(prisma)
  await seedImages(prisma)
  // await seedCustomers(prisma)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
