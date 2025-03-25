import { PrismaClient } from '@prisma/client'
import { seedClassifieds } from './classifieds.seed'
import { seedCustomers } from './customers.seed'
import { seedImages } from './images.seed'

const prisma = new PrismaClient()

async function main() {
  // await prisma.$executeRaw`TRUNCATE TABLE "makes" RESTART IDENTITY CASCADE`;
  // await prisma.$executeRaw`TRUNCATE TABLE "classifieds" RESTART IDENTITY CASCADE`;
  await seedClassifieds(prisma)
  await seedImages(prisma)
  await seedCustomers(prisma)
  // await seedTaxonomy(prisma)
  // await seedAdmin(prisma)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
