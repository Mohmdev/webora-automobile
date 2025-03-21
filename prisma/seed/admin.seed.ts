import { bcryptPasswordHash } from "@/lib/bcrypt"
import type { PrismaClient } from "@prisma/client"

export async function seedAdmin(prisma: PrismaClient) {
  const password = await bcryptPasswordHash("demo@webora.app")

  const admin = await prisma.user.create({
    data: {
      email: "demo@webora.app",
      hashedPassword: password,
    },
  })

  console.log("Admin created: ", admin)

  return admin
}
