import { PrismaClient } from "@prisma/client"
import { seedAdmin } from "./admin.seed"
import { seedTaxonomy } from "./taxonomy.seed"

const prisma = new PrismaClient()

async function main() {
  // await prisma.$executeRaw`TRUNCATE TABLE "makes" RESTART IDENTITY CASCADE`;
  // await prisma.$executeRaw`TRUNCATE TABLE "classifieds" RESTART IDENTITY CASCADE`;
  // await seedClassifieds(prisma);
  // await seedImages(prisma);
  // await seedCustomers(prisma);
  await seedTaxonomy(prisma)
  await seedAdmin(prisma)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
